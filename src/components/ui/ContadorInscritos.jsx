"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, Award, Sparkles } from "lucide-react";

export default function ContadorInscritos() {
  const [total, setTotal] = useState(0);
  const [animado, setAnimado] = useState(false);
  const [cambio, setCambio] = useState(0);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch("/api/inscripciones/contador");

        if (!res.ok) {
          throw new Error("No fue posible obtener el contador.");
        }

        const data = await res.json();
        
        // Calcular cambio desde la última carga
        if (total > 0) {
          setCambio(data.total - total);
        }
        
        setTotal(data.total);
        setAnimado(true);
        
        // Remover animación después de 2 segundos
        setTimeout(() => setAnimado(false), 2000);
      } catch (error) {
        console.error("Error cargando contador:", error);
      }
    }

    // Primera carga
    cargar();

    // Actualizar cada 30 segundos
    const interval = setInterval(cargar, 30000);

    return () => clearInterval(interval);
  }, [total]);

  // Formatear número con separadores de miles
  const formatearNumero = (num) => {
    return num.toLocaleString('es-ES');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div
        className={`
          relative
          bg-gradient-to-br from-white to-slate-50/90
          backdrop-blur-md
          border border-slate-200/80
          rounded-2xl
          shadow-xl shadow-slate-200/50
          px-6 py-4
          flex items-center gap-4
          transition-all duration-300
          hover:scale-105 hover:shadow-2xl hover:shadow-slate-300/50
          hover:border-slate-300
          ${animado ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-white' : ''}
        `}
      >
        {/* Anillo decorativo giratorio */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
        
        {/* Círculo con gradiente */}
        <div
          className="
            relative
            w-14 h-14
            rounded-full
            bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600
            flex items-center justify-center
            shadow-lg shadow-blue-500/25
            group-hover:shadow-xl group-hover:shadow-blue-500/30
            transition-all duration-300
          "
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
          
          {/* Ícono */}
          <Users className="text-white relative z-10" size={24} />
          
          {/* Partículas decorativas (solo en hover) */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse delay-150"></div>
        </div>

        {/* Contenido */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold">
              Personas inscritas
            </p>
            
            {/* Indicador de cambio */}
            {cambio > 0 && (
              <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded-full">
                <TrendingUp className="w-2.5 h-2.5" />
                +{cambio}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <p className={`
              text-3xl font-bold text-slate-900
              transition-all duration-300
              ${animado ? 'scale-110 text-blue-600' : ''}
            `}>
              {formatearNumero(total)}
            </p>
            
            {/* Badge de evento en vivo */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-700 text-[8px] font-bold uppercase tracking-wider border border-emerald-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              En vivo
            </span>
          </div>
          
          {/* Barra de progreso decorativa */}
          <div className="mt-1.5 h-0.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
              style={{ 
                width: `${Math.min((total / 100) * 100, 100)}%`,
                opacity: total > 0 ? 1 : 0
              }}
            ></div>
          </div>
        </div>

        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></div>
      </div>
      
      {/* Tooltip flotante */}
      <div className="absolute -top-12 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
        <div className="bg-slate-800/90 backdrop-blur-sm text-white text-[10px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            Actualizado en tiempo real
          </span>
        </div>
        {/* Triángulo */}
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800/90 mx-auto"></div>
      </div>
    </div>
  );
}