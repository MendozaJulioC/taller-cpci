'use client'

import Link from 'next/link';
import {
  FaHandshake,
  FaExchangeAlt,
  FaChartLine,
} from "react-icons/fa";

export default function About() {
  const objectives = [
    {
      title: 'Actividad 1: Health Check de la Base Espacial',
      subtitle: 'Conexión y limpieza de datos',
      icon: <FaHandshake className="text-3xl text-blue-600" />,
      description: 'Los participantes deben conectar Power BI a una base de datos (PostGIS o similar) y realizar un proceso de ETL orientado a lo territorial.',
      reto: 'Identificar y corregir inconsistencias comunes, como predios con área cero, registros duplicados o errores de tipología en el uso del suelo, antes de cargar los datos al modelo.',
    },
    {
      title: 'Actividad 2: Diseño de Mapas Coropléticos',
      subtitle: 'Integración ArcGIS for Power BI',
      icon: <FaExchangeAlt className="text-3xl text-green-600" />,
      description: "Configuración de visualizaciones espaciales avanzadas utilizando el objeto visual de ArcGIS o Mapbox dentro de Power BI.",
      reto: 'Crear un mapa coroplético que muestre la distribución de un indicador clave (densidad poblacional, acceso a servicios, etc.) a nivel de distrito o comuna, utilizando datos reales.',
    },
    {
      title: "Actividad 3: Simulación para Tomadores de Decisión",
      subtitle: 'Roleplay estratégico',
      icon: <FaChartLine className="text-3xl text-orange-600" />,
      description: 'En grupos, los analistas deben diseñar un tablero de "Control de Metas" para un Secretario o Director de área.',
      reto: 'Simular una reunión de toma de decisiones donde los participantes presenten su tablero a un "Director" (interpretado por un instructor) y respondan preguntas críticas sobre interpretación de datos.',
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50">

      {/* Encabezado superior */}
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          CPCI
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Taller 1: Visualización Avanzada
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Transforma datos crudos de bases espaciales en herramientas de decisión estratégica con Power BI y ArcGIS.
        </p>
      </div>

      {/* Sección de Actividades */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 flex items-center gap-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            Actividades del Taller
          </h3>
          <span className="h-px flex-1 bg-slate-200"></span>
        </div>

        {/* GRID MEJORADO:
          Usamos 'grid-rows-1' o dejamos que el flex/grid estire las tarjetas.
          Se añade 'h-full flex flex-col justify-between' en la tarjeta para forzar 
          que todas midan lo mismo y el contenido se distribuya uniformemente.
        */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {objectives.map((objective) => (
            <Link href="/taller" key={objective.title} className="h-full">
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm h-full flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:shadow-slate-200/50">
                <div>
                  {/* Icono */}
                  <div className="mb-5 p-3 bg-slate-50 w-fit rounded-xl border border-slate-100">
                    {objective.icon}
                  </div>
                  
                  {/* Títulos */}
                  <h4 className="text-lg font-bold text-slate-900 leading-snug">
                    {objective.title}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5">
                    {objective.subtitle}
                  </p>

                  {/* Textos descriptivos */}
                  <div className="space-y-4 mb-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-700">Dinámica: </span>
                      {objective.description}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-blue-600">Reto: </span>
                      {objective.reto}
                    </p>
                  </div>
                </div>

                {/* Pie de tarjeta (Indicador visual de acción) */}
                <div className="text-xs font-semibold text-blue-600 flex items-center gap-2 group-hover:translate-x-1 transition-transform border-t border-slate-50 pt-4 mt-auto">
                  Ver detalles del taller 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}