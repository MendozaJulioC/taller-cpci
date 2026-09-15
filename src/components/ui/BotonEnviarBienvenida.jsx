// src/components/ui/BotonEnviarBienvenida.jsx
"use client";

import { useState, useEffect } from "react";
import { X, Mail, Send, Users, CheckCircle, AlertCircle, Loader2, Calendar, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ModalParticipantes from "./ModalParticipantes";

export default function BotonEnviarBienvenida() {
  const { usuario } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalParticipantesOpen, setModalParticipantesOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [cargandoEstado, setCargandoEstado] = useState(true);

  // 👇 Estado del envío persistente (desde la BD)
  const [estado, setEstado] = useState({
    totalEnviados: 0,
    totalPendientes: 0,
    totalGeneral: 0,
  });

  // 👇 Tamaño del lote diario (configurable)
  const TAMAÑO_ENVIO_DIARIO = 18;

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

  // 👇 Cargar estado desde el servidor
  const cargarEstado = async () => {
    try {
      setCargandoEstado(true);
      const response = await fetch("/api/bienvenida");
      const data = await response.json();

      if (data.success) {
        setEstado({
          totalEnviados: data.totalEnviados || 0,
          totalPendientes: data.totalPendientes || 0,
          totalGeneral: data.totalGeneral || 0,
        });
      }
    } catch (error) {
      console.error("Error al cargar estado:", error);
    } finally {
      setCargandoEstado(false);
    }
  };

  useEffect(() => {
    if (!isMounted || !usuarioAutorizado) {
      setCargandoEstado(false);
      return;
    }

    cargarEstado();
  }, [isMounted, usuarioAutorizado]);

  // 👇 ENVIAR LOTE DIARIO
  const handleEnviar = async () => {
    try {
      setEnviando(true);
      setResultado(null);

      console.log(`📧 Enviando lote diario de ${TAMAÑO_ENVIO_DIARIO} correos...`);

      const response = await fetch("/api/bienvenida", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limiteDiario: TAMAÑO_ENVIO_DIARIO,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar los correos");
      }

      // Actualizar estado con los resultados
      setResultado({
        success: true,
        enviadosHoy: data.enviadosHoy || 0,
        exitosos: data.exitosos || 0,
        fallidos: data.fallidos || 0,
        totalEnviados: data.totalEnviados || 0,
        totalPendientes: data.totalPendientes || 0,
        totalGeneral: data.totalGeneral || 0,
        completado: data.completado || false,
        detalles: data.detalles || [],
      });

      // Actualizar el estado global
      setEstado({
        totalEnviados: data.totalEnviados || 0,
        totalPendientes: data.totalPendientes || 0,
        totalGeneral: data.totalGeneral || 0,
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

  if (!isMounted) return null;
  if (!usuarioAutorizado) return null;
  if (!visible) return null;

  // Calcular progreso
  const porcentajeEnviado = estado.totalGeneral > 0
    ? (estado.totalEnviados / estado.totalGeneral) * 100
    : 0;

  // ¿Hay pendientes?
  const hayPendientes = estado.totalPendientes > 0;
  const todosEnviados = estado.totalGeneral > 0 && estado.totalPendientes === 0;

  return (
    <>
      <ModalParticipantes
        isOpen={modalParticipantesOpen}
        onClose={() => setModalParticipantesOpen(false)}
      />

      <div className="fixed top-[calc(7.5rem+90px)] right-4 z-40 max-w-xs w-full animate-in slide-in-from-top-4 duration-500">
        <div className={`relative rounded-xl shadow-lg overflow-hidden ${
          todosEnviados
            ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 shadow-blue-500/25"
            : "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 shadow-emerald-500/25"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>

          <div className="relative px-3 py-2.5 flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex items-center justify-center w-7 h-7 bg-white/20 rounded-full backdrop-blur-sm">
                <Mail className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[11px] leading-tight uppercase tracking-wide">
                {todosEnviados ? "✅ Envío completado" : "📧 Envío de bienvenida"}
              </p>
              
              {/* Progreso */}
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <button
                  onClick={() => setModalParticipantesOpen(true)}
                  className="flex items-center gap-0.5 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors"
                  title="Ver lista de inscritos"
                >
                  <Users className="w-2.5 h-2.5 text-white" />
                  <span className="text-[10px] font-bold text-white">
                    {cargandoEstado ? "..." : `${estado.totalGeneral}`}
                  </span>
                </button>

                {/* Mostrar enviados / pendientes */}
                {!cargandoEstado && estado.totalGeneral > 0 && (
                  <span className="text-[10px] font-bold text-white/90">
                    ✅ {estado.totalEnviados} / ⏳ {estado.totalPendientes}
                  </span>
                )}

                {/* Botón de envío */}
                {hayPendientes && (
                  <button
                    onClick={() => setModalConfirmOpen(true)}
                    disabled={enviando}
                    className="flex items-center gap-0.5 bg-white hover:bg-white/90 px-2 py-0.5 rounded-full transition-colors disabled:opacity-50"
                  >
                    {enviando ? (
                      <Loader2 className="w-2.5 h-2.5 text-emerald-600 animate-spin" />
                    ) : (
                      <Send className="w-2.5 h-2.5 text-emerald-600" />
                    )}
                    <span className="text-[10px] font-bold text-emerald-700">
                      {enviando ? "Enviando..." : `Enviar ${Math.min(TAMAÑO_ENVIO_DIARIO, estado.totalPendientes)}`}
                    </span>
                  </button>
                )}
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

          {/* Barra de progreso */}
          <div className="relative h-1 bg-white/20">
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-500"
              style={{ width: `${porcentajeEnviado}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación / resultado */}
      {modalConfirmOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && !enviando && setModalConfirmOpen(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  {resultado?.success === false ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : resultado?.success === true ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : enviando ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    {enviando
                      ? "Enviando lote diario..."
                      : resultado
                      ? resultado.success
                        ? "¡Lote enviado!"
                        : "Error en el envío"
                      : "Confirmar envío diario"}
                  </h2>
                  <p className="text-emerald-100 text-sm">
                    {enviando
                      ? "Enviando correos pendientes..."
                      : resultado
                      ? "Resumen del envío"
                      : `${Math.min(TAMAÑO_ENVIO_DIARIO, estado.totalPendientes)} correos pendientes`}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* PROGRESO DE ENVÍO */}
              {enviando && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-emerald-800">
                        Enviando correos...
                      </span>
                      <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    </div>
                    <p className="text-xs text-emerald-700">
                      Se están enviando hasta {TAMAÑO_ENVIO_DIARIO} correos. Esto puede tardar ~50 segundos.
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 text-center">
                    ⚠️ No cierres esta ventana mientras se envían los correos
                  </p>
                </div>
              )}

              {/* CONFIRMACIÓN INICIAL */}
              {!enviando && !resultado && (
                <>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Se enviará el correo de bienvenida a{" "}
                    <strong className="text-slate-800">
                      {Math.min(TAMAÑO_ENVIO_DIARIO, estado.totalPendientes)} personas
                    </strong>{" "}
                    (de {estado.totalPendientes} pendientes en total).
                  </p>

                  {/* Estado actual */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xl font-bold text-emerald-600">
                          {estado.totalEnviados}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase">Enviados</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-amber-600">
                          {estado.totalPendientes}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase">Pendientes</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-slate-700">
                          {estado.totalGeneral}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase">Total</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <p className="text-xs text-blue-800 flex items-start gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Envío diario:</strong> Se enviarán hasta {TAMAÑO_ENVIO_DIARIO} correos hoy.
                        Los pendientes restantes se podrán enviar mañana para evitar el bloqueo de Gmail.
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
                      Enviar lote de hoy
                    </button>
                  </div>
                </>
              )}

              {/* RESULTADO FINAL */}
              {resultado && !enviando && (
                <>
                  {resultado.success ? (
                    <>
                      <div className="space-y-3 mb-4">
                        {/* Resultado del lote actual */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <p className="text-sm font-semibold text-green-800 mb-2">
                            ✅ Lote enviado
                          </p>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <p className="text-2xl font-bold text-slate-800">
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
                            <div>
                              <p className="text-2xl font-bold text-amber-600">
                                {resultado.totalPendientes}
                              </p>
                              <p className="text-[10px] text-slate-500 uppercase">
                                Pendientes
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Estado general */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                          <p className="text-xs font-semibold text-slate-600 mb-2">
                            Progreso general:
                          </p>
                          <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${(resultado.totalEnviados / resultado.totalGeneral) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500 text-center">
                            {resultado.totalEnviados} de {resultado.totalGeneral} enviados
                          </p>
                        </div>

                        {/* Mensaje de completado */}
                        {resultado.completado && (
                          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center">
                            <p className="text-sm font-bold text-emerald-800">
                              🎉 ¡Todos los correos han sido enviados!
                            </p>
                          </div>
                        )}

                        {/* Si quedan pendientes, avisar */}
                        {!resultado.completado && resultado.totalPendientes > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                            <p className="text-xs text-blue-800 flex items-start gap-2">
                              <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>
                                Quedan <strong>{resultado.totalPendientes} correos pendientes</strong>.
                                Puedes enviar el siguiente lote mañana desde el mismo botón.
                              </span>
                            </p>
                          </div>
                        )}

                        {/* Correos fallidos */}
                        {resultado.fallidos > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3 max-h-32 overflow-y-auto">
                            <p className="text-xs font-semibold text-red-700 mb-1">
                              Correos fallidos ({resultado.fallidos}):
                            </p>
                            <ul className="text-[11px] text-red-600 space-y-0.5">
                              {resultado.detalles
                                .filter((d) => d.estado === "fallido")
                                .map((d, i) => (
                                  <li key={i}>• {d.email}</li>
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