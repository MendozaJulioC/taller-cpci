// src/components/ui/ModalInscripcionesCerradas.jsx
'use client'

import { X, AlertCircle, Mail, MessageCircle, Calendar } from 'lucide-react';

export default function ModalInscripcionesCerradas({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header con icono */}
        <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 px-6 py-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-lg">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-xl font-bold text-white mb-1">
            Inscripciones Cerradas
          </h2>
          <p className="text-white/90 text-sm">
            El período de inscripción ha finalizado
          </p>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">
                  Fecha de cierre
                </p>
                <p className="text-sm text-amber-700">
                  Las inscripciones al taller finalizaron el <strong>miércoles 9 de septiembre de 2026</strong>.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Si tienes dudas o necesitas más información, puedes comunicarte con nuestro equipo de soporte:
          </p>

          {/* Contactos */}
          <div className="space-y-2">
            <a 
              href="mailto:soportecatastroapp@gmail.com"
              className="flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all group"
            >
              <div className="p-2 bg-blue-100 group-hover:bg-blue-200 rounded-lg transition-colors">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-500">Correo electrónico</p>
                <p className="text-sm font-medium text-slate-800 truncate">
                  soportecatastroapp@gmail.com
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-500">Soporte técnico</p>
                <p className="text-sm font-medium text-slate-800">
                  Equipo CPCI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}