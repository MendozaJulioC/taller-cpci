'use client'

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ActividadesTallerUno from './tallerUno/Actividades';
import ActividadesTallerDos from './tallerDos/Actividades';
import ActividadesTallerTres from './tallerTres/Actividades';
import CapasDatos from './CapasDatos';
import ContadorInscritos from "@/components/ui/ContadorInscritos";

export default function TallerPage() {
  const actividades = [
    {
      num: 1,
      color: 'blue',
      titulo: 'Health check de la base espacial',
      subtitulo: 'Conexión y limpieza de datos',
      dinamica: 'Los participantes conectan Power BI a una base de datos PostGIS o similar, y realizan un proceso de ETL orientado a lo territorial.',
      reto: 'Identificar y corregir inconsistencias: predios con área cero, registros duplicados o errores de tipología en el uso del suelo, antes de cargar los datos al modelo.',
      resultados: 'Procesos realizados para la limpieza de los datos. 2-Modelo de datos utilizado para la realización del ejercicio',
    },
    {
      num: 2,
      color: 'green',
      titulo: 'Diseño de mapas coropléticos e integración ArcGIS',
      subtitulo: 'Visualización espacial avanzada',
      dinamica: 'Configuración de visualizaciones espaciales avanzadas utilizando el objeto visual de ArcGIS o Mapbox dentro de Power BI.',
      reto: 'Crear un mapa coroplético que muestre la distribución de un indicador clave (densidad poblacional, acceso a servicios, etc.) a nivel de distrito o comuna con datos reales.',
      resultados: 'Objetos visuales geográficos.',
    },
    {
      num: 3,
      color: 'amber',
      titulo: 'Simulación para tomadores de decisión',
      subtitulo: 'Roleplay estratégico',
      dinamica: 'En grupos, los analistas diseñan un tablero de "Control de Metas" para un Secretario o Director de área.',
      reto: 'Simular una reunión donde los participantes presenten su tablero y respondan preguntas críticas sobre interpretación de datos y recomendaciones estratégicas.',
      resultados: 'Versión final del tablero con información clara que ayude a la comprensión de la información mostrada.',
    },
  ];

  const colorMap = {
    blue: {
      num: 'bg-blue-50 border-blue-200 text-blue-700',
      badge: 'bg-blue-500',
      border: 'border-blue-100/60',
      bg: 'bg-blue-50/30',
      dot: 'bg-blue-500',
      gradient: 'from-blue-50 to-transparent',
      icon: '🔵',
    },
    green: {
      num: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      badge: 'bg-emerald-500',
      border: 'border-emerald-100/60',
      bg: 'bg-emerald-50/30',
      dot: 'bg-emerald-500',
      gradient: 'from-emerald-50 to-transparent',
      icon: '🟢',
    },
    amber: {
      num: 'bg-amber-50 border-amber-200 text-amber-700',
      badge: 'bg-amber-500',
      border: 'border-amber-100/60',
      bg: 'bg-amber-50/30',
      dot: 'bg-amber-500',
      gradient: 'from-amber-50 to-transparent',
      icon: '🟠',
    },
  };

  const objetivos = [
    { icon: '🔌', text: 'Conectar Power BI a bases de datos espaciales (PostGIS) y ejecutar procesos ETL territoriales.' },
    { icon: '🗺️', text: 'Diseñar visualizaciones espaciales con ArcGIS y mapas coropléticos de indicadores clave.' },
    { icon: '📊', text: 'Presentar tableros a tomadores de decisión y sustentar recomendaciones estratégicas.' },
  ];

  // Herramientas BI con logos - posiciones fijas sin animación para evitar errores de hidratación
  const herramientasBI = [
    { nombre: 'Power BI', icono: '/Img/powerbi.png', rotacion: '-8deg', tamaño: 'w-25 h-25', top: '2%', left: '5%' },
    { nombre: 'Tableau', icono: '/Img/tableau.png', rotacion: '12deg', tamaño: 'w-21 h-21', top: '60%', left: '15%' },
    { nombre: 'Qlik', icono: '/Img/qlik.png', rotacion: '-12deg', tamaño: 'w-19 h-19', top: '-12%', left: '55%' },
    { nombre: 'Excel', icono: '/Img/excel.png', rotacion: '15deg', tamaño: 'w-23 h-23', top: '55%', left: '60%' },
  ];

  return (
   <>
      <ContadorInscritos />
      <ProtectedRoute>
        <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/60 px-4 py-12 md:py-16 antialiased">
        <div className="max-w-6xl mx-auto">

          {/* Hero Section - Con layout de 2 columnas */}
          <div className="relative bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-8 md:p-12 mb-12 overflow-hidden" style={{ minHeight: '320px' }}>
            {/* Fondo decorativo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/5 to-amber-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
            
            <div className="relative grid md:grid-cols-5 gap-8 items-center">
              {/* Columna izquierda - Texto */}
              <div className="md:col-span-3">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-blue-500/25">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                    CPCI · Taller 1
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-medium px-3.5 py-1.5 rounded-full">
                    <span className="text-sm">🎯</span>
                    3 actividades prácticas
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-3">
                  Visualización Avanzada
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    con Power BI
                  </span>
                </h1>
                
                <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl font-medium mb-5">
                  Aprende a transformar datos crudos de bases espaciales en herramientas de decisión
                  estratégica usando Power BI, ArcGIS y técnicas de ETL territorial.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Comité Permanente sobre el Catastro en Iberoamérica', 'Datos espaciales', 'Visualización interactiva'].map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100/80 border border-slate-200/60 rounded-full px-3.5 py-1 backdrop-blur-sm">
                      <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Columna derecha - Logos de herramientas BI "flotando" sin animación */}
              <div className="md:col-span-2 relative" style={{ minHeight: '200px' }}>
                {herramientasBI.map((herramienta) => (
                  <div
                    key={herramienta.nombre}
                    className="absolute transition-all duration-300 hover:scale-110 hover:z-10 hover:rotate-0"
                    style={{
                      top: herramienta.top,
                      left: herramienta.left,
                      transform: `rotate(${herramienta.rotacion})`,
                    }}
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-slate-200/50 border border-slate-200/40 hover:shadow-xl">
                      <img
                        src={herramienta.icono}
                        alt={herramienta.nombre}
                        className={`${herramienta.tamaño} object-contain`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Objetivos del Taller - Mejorado */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200"></div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
                <span className="text-base">🎯</span>
                Objetivos del taller
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {objetivos.map((o, i) => (
                <div 
                  key={i} 
                  className="group bg-white border border-slate-200/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {o.icon}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{o.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actividades - Rediseñado */}
          <div className="mb-16">
            <ActividadesTallerUno />
          </div>

          <div className="mb-16">
            <ActividadesTallerDos />
          </div>

          <div className="mb-16">
            <ActividadesTallerTres />
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200"></div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
                <span className="text-base">🗺️</span>
                Información de Interés
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200"></div>
            </div>
            
            <CapasDatos />
            
            <p className="text-center text-xs text-slate-400 mt-3">
              Las capas marcadas como <span className="text-blue-600 font-medium">Disponible</span> están listas para su descarga en el repositorio del taller
            </p>
          </div>

          {/* Footer - Nuevo */}
          <div className="mt-16 pt-8 border-t border-slate-200/60 text-center">
            <p className="text-sm text-slate-500">
              Comité Permanente sobre el Catastro en Iberoamérica · Taller de Visualización Avanzada
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Power BI · ArcGIS · ETL Territorial
            </p>
          </div>
        </div>
      </section>
    </ProtectedRoute>
   </>
  );
}