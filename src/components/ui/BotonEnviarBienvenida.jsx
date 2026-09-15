// src/components/ui/BotonEnviarBienvenida.jsx
"use client";

import { useState, useEffect } from "react";
import { X, Mail, Send, Users, CheckCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ModalParticipantes from "./ModalParticipantes";

export default function BotonEnviarBienvenida() {
  const { usuario } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalParticipantesOpen, setModalParticipantesOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [reintentando, setReintentando] = useState(false); // 👈 NUEVO
  const [resultado, setResultado] = useState(null);
  const [totalInscritos, setTotalInscritos] = useState(0);
  const [cargandoTotal, setCargandoTotal] = useState(true);
  
  const [progreso, setProgreso] = useState({
    enviados: 0,
    exitosos: 0,
    fallidos: 0,
    loteActual: 0,
    totalLotes: 0,
    totalGeneral: 0,
  });

  const TAMAÑO_LOTE = 4;

  const correosAutorizados = [
    "juliomendoza.medellin@gmail.com",
    "jg.geograf@gmail.com",
    "jucampuca@gmail.com",
  ];

  const usuarioAutorizado =
    usuario &&
    usuario.correo_electronico &&
    correosAutorizados.includes(usuario.correo_electronico.toLowerCase().trim());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !usuarioAutorizado) {
      setCargandoTotal(false);
      return;
    }

    const cargarTotal = async () => {
      try {
        setCargandoTotal(true);
        const response = await fetch("/api/bienvenida");
        const data = await response.json();

        if (data.success) {
          setTotalInscritos(data.total || 0);
        }
      } catch (error) {
        console.error("Error al cargar total:", error);
      } finally {
        setCargandoTotal(false);
      }
    };

    cargarTotal();
  }, [isMounted, usuarioAutorizado]);

  // 👇 FUNCIÓN PARA ENVÍO INICIAL POR LOTES
  const handleEnviar = async () => {
    try {
      setEnviando(true);
      setResultado(null);

      const TOTAL = totalInscritos;
      const TOTAL_LOTES = Math.ceil(TOTAL / TAMAÑO_LOTE);

      setProgreso({
        enviados: 0,
        exitosos: 0,
        fallidos: 0,
        loteActual: 0,
        totalLotes: TOTAL_LOTES,
        totalGeneral: TOTAL,
      });

      let exitososTotal = 0;
      let fallidosTotal = 0;
      const detallesTotal = [];
      let inicio = 0;

      while (inicio < TOTAL) {
        const loteNumero = Math.floor(inicio / TAMAÑO_LOTE) + 1;

        setProgreso((prev) => ({ ...prev, loteActual: loteNumero }));

        console.log(`📦 Enviando lote ${loteNumero}/${TOTAL_LOTES} (inicio: ${inicio})`);

        const response = await fetch("/api/bienvenida", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inicio: inicio,
            limite: TAMAÑO_LOTE,
            totalGeneral: TOTAL,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Error en el lote ${loteNumero}`);
        }

        exitososTotal += data.exitosos || 0;
        fallidosTotal += data.fallidos || 0;
        if (data.detalles) {
          detallesTotal.push(...data.detalles);
        }

        const enviadosHasta = Math.min(inicio + TAMAÑO_LOTE, TOTAL);
        setProgreso({
          enviados: enviadosHasta,
          exitosos: exitososTotal,
          fallidos: fallidosTotal,
          loteActual: loteNumero,
          totalLotes: TOTAL_LOTES,
          totalGeneral: TOTAL,
        });

        inicio += TAMAÑO_LOTE;

        if (inicio < TOTAL) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      setResultado({
        success: true,
        total: TOTAL,
        exitosos: exitososTotal,
        fallidos: fallidosTotal,
        detalles: detallesTotal,
      });
    } catch (error) {
      console.error("Error:", error);
      setResultado({
        success: false,
        message: error.message,
      });
    } finally {
      setEnviando(false);
    }
  };

  // 👇 NUEVA FUNCIÓN: REINTENTAR CORREOS FALLIDOS
  const handleReintentar = async () => {
    if (!resultado || !resultado.detalles) return;

    // Obtener solo los emails de los fallidos
    const emailsFallidos = resultado.detalles
      .filter((d) => d.estado === "fallido")
      .map((d) => d.email);

    if (emailsFallidos.length === 0) {
      return;
    }

    try {
      setReintentando(true);

      console.log(`🔄 Reintentando ${emailsFallidos.length} correos fallidos...`);

      // 👇 Reintentar en lotes también
      const TAMAÑO_LOTE_REINTENTO = 5;
      let exitososReintento = 0;
      let fallidosReintento = 0;
      const detallesReintento = [];

      for (let i = 0; i < emailsFallidos.length; i += TAMAÑO_LOTE_REINTENTO) {
        const loteEmails = emailsFallidos.slice(i, i + TAMAÑO_LOTE_REINTENTO);

        console.log(`🔄 Reintentando lote ${Math.floor(i / TAMAÑO_LOTE_REINTENTO) + 1} (${loteEmails.length} correos)`);

        const response = await fetch("/api/bienvenida", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reintentar: true,
            emailsFallidos: loteEmails,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          exitososReintento += data.exitosos || 0;
          fallidosReintento += data.fallidos || 0;
          if (data.detalles) {
            detallesReintento.push(...data.detalles);
          }
        }

        // Pausa entre lotes de reintento
        if (i + TAMAÑO_LOTE_REINTENTO < emailsFallidos.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      // 👇 Actualizar el resultado: los que se reintentaron con éxito se mueven de "fallidos" a "exitosos"
      const emailsExitososReintento = detallesReintento
        .filter((d) => d.estado === "exitoso")
        .map((d) => d.email);

      const nuevosExitosos = resultado.exitosos + exitososReintento;
      const nuevosFallidos = resultado.fallidos - exitososReintento;

      // Actualizar detalles: cambiar estado de los que se reintentaron con éxito
      const nuevosDetalles = resultado.detalles.map((d) => {
        if (d.estado === "fallido" && emailsExitososReintento.includes(d.email)) {
          return { ...d, estado: "exitoso", reintentado: true };
        }
        return d;
      });

      setResultado({
        success: true,
        total: resultado.total,
        exitosos: nuevosExitosos,
        fallidos: nuevosFallidos,
        detalles: nuevosDetalles,
        reintentoRealizado: true,
      });

      console.log(`✅ Reintento completado: ${exitososReintento} exitosos, ${fallidosReintento} siguen fallando`);
    } catch (error) {
      console.error("Error en reintento:", error);
    } finally {
      setReintentando(false);
    }
  };

  if (!isMounted) return null;
  if (!usuarioAutorizado) return null;
  if (!visible) return null;

  // Contar correos fallidos actuales
  const correosFallidosActuales = resultado?.detalles
    ? resultado.detalles.filter((d) => d.estado === "fallido").length
    : 0;

  return (
    <>
      <ModalParticipantes
        isOpen={modalParticipantesOpen}
        onClose={() => setModalParticipantesOpen(false)}
      />

      <div className="fixed top-[calc(7.5rem+90px)] right-4 z-40 max-w-xs w-full animate-in slide-in-from-top-4 duration-500">
        <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/25 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>

          <div className="relative px-3 py-2.5 flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex items-center justify-center w-7 h-7 bg-white/20 rounded-full backdrop-blur-sm">
                <Mail className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[11px] leading-tight uppercase tracking-wide">
                📧 Enviar correo de bienvenida
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <button
                  onClick={() => setModalParticipantesOpen(true)}
                  className="flex items-center gap-0.5 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors"
                >
                  <Users className="w-2.5 h-2.5 text-white" />
                  <span className="text-[10px] font-bold text-white">
                    {cargandoTotal ? "..." : `${totalInscritos} inscritos`}
                  </span>
                </button>

                <button
                  onClick={() => setModalConfirmOpen(true)}
                  disabled={enviando || totalInscritos === 0}
                  className="flex items-center gap-0.5 bg-white hover:bg-white/90 px-2 py-0.5 rounded-full transition-colors disabled:opacity-50"
                >
                  {enviando ? (
                    <Loader2 className="w-2.5 h-2.5 text-emerald-600 animate-spin" />
                  ) : (
                    <Send className="w-2.5 h-2.5 text-emerald-600" />
                  )}
                  <span className="text-[10px] font-bold text-emerald-700">
                    {enviando ? "Enviando..." : "Enviar"}
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="flex-shrink-0 text-white/50 hover:text-white transition-colors p-0.5 hover:bg-white/10 rounded"
              aria-label="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative h-0.5 bg-white/20">
            <div className="h-full bg-white/60 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación / progreso / resultado */}
      {modalConfirmOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && !enviando && !reintentando && setModalConfirmOpen(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  {resultado?.success === false ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : resultado?.success === true ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : enviando || reintentando ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    {reintentando
                      ? "Reintentando correos..."
                      : enviando
                      ? "Enviando correos..."
                      : resultado
                      ? resultado.success
                        ? "¡Envío completado!"
                        : "Error en el envío"
                      : "Confirmar envío masivo"}
                  </h2>
                  <p className="text-emerald-100 text-sm">
                    {reintentando
                      ? "Reenviando correos fallidos"
                      : enviando
                      ? `Lote ${progreso.loteActual} de ${progreso.totalLotes}`
                      : resultado
                      ? "Resumen del envío"
                      : `${totalInscritos} personas recibirán el correo`}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* PROGRESO DE ENVÍO INICIAL */}
              {enviando && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-emerald-800">
                        Enviando correos...
                      </span>
                      <span className="text-sm font-bold text-emerald-700">
                        {progreso.enviados}/{progreso.totalGeneral}
                      </span>
                    </div>
                    
                    <div className="w-full bg-emerald-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${(progreso.enviados / progreso.totalGeneral) * 100}%`,
                        }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                      <div>
                        <p className="text-lg font-bold text-emerald-600">
                          {progreso.exitosos}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase">Exitosos</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-red-600">
                          {progreso.fallidos}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase">Fallidos</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-600">
                          {progreso.totalLotes - progreso.loteActual}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase">Lotes restantes</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 text-center">
                    ⚠️ No cierres esta ventana mientras se envían los correos
                  </p>
                </div>
              )}

              {/* PROGRESO DE REINTENTO */}
              {reintentando && (
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <RefreshCw className="w-6 h-6 text-amber-600 animate-spin" />
                      <span className="text-sm font-semibold text-amber-800">
                        Reintentando correos fallidos...
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 text-center">
                      Esto puede tardar unos segundos. Por favor espera.
                    </p>
                  </div>
                </div>
              )}

              {/* CONFIRMACIÓN INICIAL */}
              {!enviando && !reintentando && !resultado && (
                <>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Estás a punto de enviar el correo de bienvenida al taller a{" "}
                    <strong className="text-slate-800">
                      {totalInscritos} {totalInscritos === 1 ? "persona" : "personas"}
                    </strong>{" "}
                    registradas en la plataforma.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <p className="text-xs text-blue-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Envío por lotes:</strong> Los correos se enviarán en{" "}
                        {Math.ceil(totalInscritos / TAMAÑO_LOTE)} lotes de {TAMAÑO_LOTE}. 
                        Esto evita timeouts y garantiza que todos reciban el correo.
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setModalConfirmOpen(false)}
                      disabled={enviando}
                      className="flex-1 py-2.5 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleEnviar}
                      disabled={enviando}
                      className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Sí, enviar a todos
                    </button>
                  </div>
                </>
              )}

              {/* RESULTADO FINAL */}
              {resultado && !reintentando && (
                <>
                  {resultado.success ? (
                    <>
                      <div className="space-y-3 mb-4">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <p className="text-sm font-semibold text-green-800 mb-2">
                            {resultado.reintentoRealizado
                              ? "✅ Reintento completado"
                              : "✅ Envío completado"}
                          </p>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <p className="text-2xl font-bold text-slate-800">
                                {resultado.total}
                              </p>
                              <p className="text-[10px] text-slate-500 uppercase">Total</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-emerald-600">
                                {resultado.exitosos}
                              </p>
                              <p className="text-[10px] text-slate-500 uppercase">
                                Exitosos
                              </p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-red-600">
                                {resultado.fallidos}
                              </p>
                              <p className="text-[10px] text-slate-500 uppercase">
                                Fallidos
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 👇 BOTÓN DE REINTENTAR (si hay fallidos) */}
                        {correosFallidosActuales > 0 && (
                          <button
                            onClick={handleReintentar}
                            disabled={reintentando}
                            className="w-full py-2.5 text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-300 rounded-lg hover:bg-amber-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Reintentar {correosFallidosActuales} correo{correosFallidosActuales !== 1 ? "s" : ""} fallido{correosFallidosActuales !== 1 ? "s" : ""}
                          </button>
                        )}

                        {correosFallidosActuales > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3 max-h-32 overflow-y-auto">
                            <p className="text-xs font-semibold text-red-700 mb-1">
                              Correos fallidos ({correosFallidosActuales}):
                            </p>
                            <ul className="text-[11px] text-red-600 space-y-0.5">
                              {resultado.detalles
                                .filter((d) => d.estado === "fallido")
                                .map((d, i) => (
                                  <li key={i}>
                                    • {d.email}
                                    {d.reintentado && (
                                      <span className="text-amber-600 ml-1">(reintentado)</span>
                                    )}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setModalConfirmOpen(false);
                          setResultado(null);
                        }}
                        className="w-full py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all"
                      >
                        Cerrar
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                        <p className="text-sm font-semibold text-red-800 mb-1">
                          ❌ Error al enviar
                        </p>
                        <p className="text-sm text-red-700">{resultado.message}</p>
                      </div>

                      <button
                        onClick={() => setResultado(null)}
                        className="w-full py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all"
                      >
                        Intentar de nuevo
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}