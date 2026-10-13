'use client'
import React, { useEffect } from 'react';

export default function ModalConvocatoriaFinalizada({ isOpen, onClose }) {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-finalizada-title"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior decorativa */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500"></div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {/* Ícono principal */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-100 animate-ping opacity-40"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Título */}
          <h2
            id="modal-finalizada-title"
            className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-3"
          >
            Convocatoria Finalizada
          </h2>

          {/* Mensaje */}
          <div className="space-y-3 text-center">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Las actividades del taller han <span className="font-semibold text-slate-800">finalizado</span>.
              El acceso a los talleres e inscripciones ha sido cerrado.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Les estaremos informando oportunamente cuando se realice una
              <span className="font-semibold text-slate-800"> nueva convocatoria</span>.
            </p>
          </div>

          {/* Bloque de soporte */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2 text-center">
              ¿Tienes dudas?
            </p>
            <p className="text-sm text-slate-700 text-center mb-2">
              Escríbenos al equipo de soporte:
            </p>
            <a
              href="mailto:soportecatastroapp@gmail.com"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline break-all"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              soportecatastroapp@gmail.com
            </a>
          </div>

          {/* Botón de cierre */}
          <button
            onClick={onClose}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
          >
            Entendido
          </button>
        </div>
      </div>

      {/* Animaciones (puedes moverlas a tu globals.css si lo prefieres) */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}