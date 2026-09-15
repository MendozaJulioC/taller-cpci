// src/components/ui/BotonEnviarBienvenida.jsx
"use client";

import { useState, useEffect } from "react";
import { X, Mail, Send, Users, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
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
  const [totalInscritos, setTotalInscritos] = useState(0);
  const [cargandoTotal, setCargandoTotal] = useState(true);

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

  // 👇 Cargar total de inscritos
  useEffect(() => {
    if (!isMounted || !usuarioAutorizado) {
      setCargandoTotal(false);
      return;
    }

    const cargarTotal = async () => {
      try {
        setCargandoTotal(true);
        
        // 👇 LOG: Verificar la URL que se está llamando
        console.log('📥 Llamando a: /api/bienvenida');
        
        const response = await fetch("/api/bienvenida");
        
        // 👇 LOG: Ver el status
        console.log('📥 Status:', response.status);
        
        const data = await response.json();
        
        // 👇 LOG: Ver la respuesta completa
        console.log('📥 Respuesta completa:', data);
        
        if (data.success) {
          // 👇 CORRECCIÓN: leer data.total directamente
          const total = data.total || 0;
          console.log('📊 Total de inscritos:', total);
          setTotalInscritos(total);
        } else {
          console.error('❌ Error en la respuesta:', data.message);
        }
      } catch (error) {
        console.error("❌ Error al cargar total:", error);
      } finally {
        setCargandoTotal(false);
      }
    };

    cargarTotal();
  }, [isMounted, usuarioAutorizado]);

  const handleEnviar = async () => {
    try {
      setEnviando(true);
      setResultado(null);

      const response = await fetch("/api/bienvenida", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ masivo: true }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar los correos");
      }

      setResultado(data);
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
                {/* 👇 Botón Ver lista - Ahora muestra el total */}
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

      {/* Modal de confirmación */}
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
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    {resultado
                      ? resultado.success
                        ? "¡Envío completado!"
                        : "Error en el envío"
                      : "Confirmar envío masivo"}
                  </h2>
                  <p className="text-emerald-100 text-sm">
                    {resultado
                      ? "Resumen del envío"
                      : `${totalInscritos} personas recibirán el correo`}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!resultado ? (
                <>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Estás a punto de enviar el correo de bienvenida al taller a{" "}
                    <strong className="text-slate-800">
                      {totalInscritos} {totalInscritos === 1 ? "persona" : "personas"}
                    </strong>{" "}
                    registradas en la plataforma.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <p className="text-xs text-amber-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Importante:</strong> Esta acción enviará correos reales.
                        Asegúrate de que la lista de inscritos es la correcta antes de
                        continuar.
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
                      {enviando ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Sí, enviar a todos
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : resultado.success ? (
                <>
                  <div className="space-y-3 mb-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-green-800 mb-2">
                        ✅ Envío completado
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

                    {resultado.fallidos > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 max-h-32 overflow-y-auto">
                        <p className="text-xs font-semibold text-red-700 mb-1">
                          Correos fallidos:
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}