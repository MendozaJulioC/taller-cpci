"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, Shield, Sparkles, Users, MapPin, Globe } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Mientras carga el contexto
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-slate-500 font-medium animate-pulse">Cargando...</p>
        </div>
      </div>
    );
  }

  // Usuario NO autenticado
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Fondo con gradiente y figuras decorativas */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
        
        {/* Figuras decorativas flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Círculos grandes */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <div className="absolute -top-80 -right-80 w-90 h-90 bg-blue-700/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-80 -left-80 w-90 h-90 bg-purple-700/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl"></div>
          
          {/* Círculos medianos flotantes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-800/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-800/20 rounded-full blur-2xl animate-float-delay"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-emerald-800/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-14 h-14 bg-amber-800/20 rounded-full blur-2xl animate-float-delay"></div>
          
          {/* Puntos decorativos */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-500/30 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-emerald-500/30 rounded-full animate-pulse delay-1000"></div>

          <div className="absolute top-1/4 right-1/4 w-2.5 h-2.5 bg-amber-500/30 rounded-full animate-pulse delay-200"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-rose-500/30 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-cyan-500/30 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-2/3 right-1/4 w-2 h-2 bg-indigo-500/30 rounded-full animate-pulse delay-900"></div>

          <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-pink-500/25 rounded-full animate-pulse delay-400"></div>
          <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-teal-500/25 rounded-full animate-pulse delay-800"></div>
          <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-blue-400/25 rounded-full animate-pulse delay-600"></div>
          <div className="absolute top-1/5 right-2/3 w-1 h-1 bg-purple-400/25 rounded-full animate-pulse delay-1100"></div>
          
          {/* Hexágonos decorativos */}
          <div className="absolute top-10 right-20 opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <polygon points="30,0 58,15 58,45 30,60 2,45 2,15" fill="none" stroke="#3B82F6" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute bottom-10 left-20 opacity-20">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <polygon points="20,0 39,10 39,30 20,40 1,30 1,10" fill="none" stroke="#8B5CF6" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute top-40 right-40 opacity-20">
            <svg width="70" height="70" viewBox="0 0 60 60">
              <polygon points="30,0 58,15 58,45 30,60 2,45 2,15" fill="none" stroke="#3B82F6" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute bottom-40 left-40 opacity-20">
            <svg width="50" height="50" viewBox="0 0 40 40">
              <polygon points="20,0 39,10 39,30 20,40 1,30 1,10" fill="none" stroke="#8B5CF6" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute bottom-80 left-80 opacity-20">
            <svg width="60" height="60" viewBox="0 0 40 40">
              <polygon points="20,0 39,10 39,30 20,40 1,30 1,10" fill="none" stroke="#8B5CA6" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Contenido principal - Card responsiva */}
        <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-2 sm:px-0">
          <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 backdrop-blur-xl border border-blue-200/50 rounded-2xl shadow-2xl shadow-blue-500/20 p-5 sm:p-6 md:p-8 lg:p-10 text-center transition-all duration-300 hover:shadow-blue-500/30 hover:shadow-3xl">
            
            {/* Icono con anillo decorativo - responsivo */}
            <div className="relative inline-block mb-3 sm:mb-4 md:mb-5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 ring-4 ring-blue-400/20">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                
                {/* Anillo decorativo giratorio */}
                <div className="absolute -inset-2 rounded-full border-2 border-blue-400/30 animate-spin-slow"></div>
                <div className="absolute -inset-4 rounded-full border border-purple-400/20 animate-spin-slow-reverse"></div>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2 tracking-tight">
              Acceso Restringido
            </h1>
            
            <div className="w-12 sm:w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 sm:mb-4 md:mb-5"></div>

            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6 max-w-md mx-auto">
              Debes registrarte e iniciar sesión para acceder al contenido de este taller.
            </p>

            {/* Beneficios - responsivo */}
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/60 rounded-xl p-2.5 sm:p-3 md:p-4 mb-4 sm:mb-5 md:mb-6 text-left border border-blue-200/30">
              <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1.5 sm:mb-2 text-center">
                Al acceder podrás:
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 sm:gap-1.5 md:gap-2">
                {[
                  { icon: <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: "Ver actividades" },
                  { icon: <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: "Acceder a recursos" },
                  { icon: <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: "Contenido exclusivo" },
                  { icon: <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: "Comunidad" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] md:text-xs text-slate-600">
                    <span className="text-blue-500 flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mensaje adicional - responsivo */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] md:text-xs text-slate-400">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400" />
              <span className="text-center">Únete a profesionales de Iberoamérica</span>
            </div>
          </div>

          {/* Logo de confianza - responsivo */}
          <div className="mt-3 sm:mt-4 md:mt-5 text-center">
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-slate-400 uppercase tracking-widest">
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 sm:w-6 h-px bg-slate-300"></span>
                <span className="hidden xs:inline">Comité Permanente sobre el Catastro en Iberoamérica</span>
                <span className="xs:hidden">CPCI</span>
                <span className="w-4 sm:w-6 h-px bg-slate-300"></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Usuario autenticado
  return children;
}