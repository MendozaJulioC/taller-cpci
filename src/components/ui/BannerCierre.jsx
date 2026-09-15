// src/components/ui/BannerCierre.jsx
"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, AlertCircle } from "lucide-react";

export default function BannerCierre() {
  const [visible, setVisible] = useState(true);
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calcularDias = () => {
      const fechaCierre = new Date(2026, 8, 9);
      const ahora = new Date();
      const diferencia = fechaCierre - ahora;
      
      if (diferencia > 0) {
        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
        setDiasRestantes(dias);
      } else {
        setDiasRestantes(0);
      }
    };

    calcularDias();
    const intervalo = setInterval(calcularDias, 3600000);
    return () => clearInterval(intervalo);
  }, [isMounted]);

  if (!isMounted) return null;
  if (!visible) return null;

  return (
    <div className="fixed top-30 right-4 z-40 max-w-xs w-full animate-in slide-in-from-top-4 duration-500">
      {/* Banner compacto */}
      <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/25 overflow-hidden">
        
        {/* Efecto de brillo sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
        
        {/* Contenido compacto */}
        <div className="relative px-3 py-2.5 flex items-start gap-2">
          {/* Icono de alerta pequeño */}
          <div className="flex-shrink-0 mt-0.5">
            <div className="flex items-center justify-center w-7 h-7 bg-white/20 rounded-full backdrop-blur-sm">
              <AlertCircle className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          
          {/* Texto compacto */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-[12px] leading-tight uppercase tracking-wide">
              ⚠️ Cierre de inscripciones
            </p>
            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
              <span className="flex items-center gap-0.5 text-[14px] text-white/90">
                <Calendar className="w-3 h-3" />
                <span className="font-medium px-5">Inscripciones cerradas.</span>
              </span>
              {diasRestantes > 0 && (
                <span className="flex items-center gap-0.5 bg-white/20 px-1.5 py-0.5 rounded-full">
                  <Clock className="w-2.5 h-2.5 text-white/90" />
                  <span className="text-[10px] font-bold text-white">
                    {diasRestantes}d
                  </span>
                </span>
              )}
            </div>
          </div>
          
          {/* Botón cerrar más pequeño */}
          <button
            onClick={() => setVisible(false)}
            className="flex-shrink-0 text-white/50 hover:text-white transition-colors p-0.5 hover:bg-white/10 rounded"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {/* Barra de progreso más delgada */}
        <div className="relative h-0.5 bg-white/20">
          <div 
            className="h-full bg-white/60 rounded-full transition-all duration-1000"
            style={{ 
              width: `${Math.max(0, Math.min(100, (diasRestantes / 30) * 100))}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}