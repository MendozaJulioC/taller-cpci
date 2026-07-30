'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  FaHandshake,
  FaExchangeAlt,
  FaChartLine,
  FaLinkedinIn, 
  FaGithub,
  FaBook,
  FaDatabase,
  FaGlobe,
  FaMap,
  FaPenTool,
  FaShareAlt
} from "react-icons/fa";
import ModalInscripcion from '@/components/ui/ModalInscripcion';

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const objectives = [
    {
      title: 'Taller 1: Plataforma Geográfica del Distrito de Medellín',
      subtitle: 'Día 1 - Lunes 31 de agosto',
      icon: <FaGlobe className="text-3xl text-blue-600" />,
      description: 'Familiarización con las herramientas geográficas del Distrito de Medellín y realización de ejercicios básicos con información catastral.',
      actividades: [
        'Actividad 1: Aspectos Generales (40-50 min)',
        'Actividad 2: Funcionalidades GeoMedellín (45 min)',
        'Actividad 3: Funcionalidades Mapas Medellín (60 min)',
        'Actividad 4: Ejercicio con Plataforma Catastro (Pendiente)'
      ],
      reto: 'Familiarizar a los asistentes con las herramientas geográficas que dispone el Distrito de Medellín y realizar ejercicios básicos con información catastral.',
    },
    {
      title: 'Taller 2: Visualización de Datos',
      subtitle: 'Día 2 - Miércoles 2 de septiembre',
      icon: <FaDatabase className="text-3xl text-green-600" />,
      description: 'Transformar datos crudos de bases espaciales en herramientas de decisión estratégica a partir de herramientas de inteligencia de negocio.',
      actividades: [
        'Actividad 1: Aspectos Generales (30-40 min)',
        'Actividad 2: Health Check (45 min)',
        'Actividad 3: Visualización Geográfica (45 min)',
        'Actividad 4: Simulación para Tomadores de Decisión (30 min)'
      ],
      reto: 'Caracterizar elementos comunes y diferenciales de 3 comunas de Medellín, mostrando la información en formato resumen ejecutivo para tomadores de decisiones.',
    },
    {
      title: 'Taller 3: Historias de Datos Espaciales',
      subtitle: 'Día 3 - Viernes 5 de septiembre',
      icon: <FaBook className="text-3xl text-orange-600" />,
      description: 'Realizar un análisis comparado de aspectos catastrales entre países y explicar sus características mediante el uso de historias de datos espaciales (Spatial Storytelling).',
      actividades: [
        'Actividad 1: Aspectos Generales (30 min)',
        'Actividad 2: Del Dato al Guión (45 min)',
        'Actividad 3: Curaduría de Mapas Narrativos (45 min)',
        'Actividad 4: El Test de la "Abuela" (45 min)'
      ],
      reto: 'Realizar una historia de datos espaciales con análisis comparativo entre los datos de Medellín (trabajados en el Taller 1) y los países de cada asistente.',
    }
  ];

  return (
    <>
      <ModalInscripcion isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <section className="py-2 bg-slate-50/50">
        {/* Encabezado superior */}
        <div className="relative w-full py-10 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6 text-center">
            
            {/* Etiqueta de evento */}
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Evento Oficial CPCI
            </span>

            {/* Título */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Taller de Visualización Avanzada para Catastro
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Lleva tus datos catastrales a tableros estratégicos con Power BI y ArcGIS.
            </p>

            {/* Contexto */}
            <p className="text-base text-slate-500 mb-10 max-w-2xl mx-auto">
              Dirigido a instituciones catastrales iberoamericanas, equipos GIS y analistas de datos territoriales.
            </p>

            {/* Botón */}
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95"
              >
                Inscríbete ahora
              </button>
            </div>

          </div>
        </div>

        {/* Sección de Actividades */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Título principal de la sección */}
          <div className="mb-12 text-center">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-4 py-1.5 rounded-full mb-4">
              Programa del Evento
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
              Actividades Relacionadas del Taller
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">
              Conoce los tres talleres diseñados para potenciar tus habilidades en visualización y análisis de datos catastrales
            </p>
          </div>

          <div className="mb-10 flex items-center gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
              Talleres del Evento
            </h3>
            <span className="h-px flex-1 bg-slate-200"></span>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {objectives.map((objective) => (
              <Link href="/taller" key={objective.title} className="h-full block group">
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
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                      {objective.subtitle}
                    </p>

                    {/* Dinámica */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      <span className="font-bold text-slate-700">Dinámica: </span>
                      {objective.description}
                    </p>

                    {/* Lista de Actividades */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Actividades:
                      </p>
                      <ul className="space-y-1.5">
                        {objective.actividades.map((actividad, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                            <span>{actividad}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Reto */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <span className="font-bold text-blue-700">🎯 Reto: </span>
                        {objective.reto}
                      </p>
                    </div>
                  </div>

                  {/* Pie de tarjeta */}
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

        {/* Sección del Facilitador */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
            
            {/* Imagen optimizada con next/image */}
            <div className="flex-shrink-0 relative size-48 md:size-60 rounded-full overflow-hidden border-4 border-blue-50 outline outline-2 -outline-offset-2 outline-blue-400">
              <Image
                alt="Jordi Guerrero Martínez"
                src="https://media.licdn.com/dms/image/v2/D4D03AQH25_FkQQx6JQ/profile-displayphoto-shrink_800_800/B4DZVSyuinHIAc-/0/1740850785102?e=1783555200&v=beta&t=Ws9U7TE4k8XLhq7BU4ORkECNWdemYgcHvDb54fCcOT4"
                fill
                sizes="(max-width: 768px) 192px, 240px"
                priority
                className="object-cover"
              />
            </div>

            {/* Información del facilitador */}
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Nuestro facilitador</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                Jordi Guerrero Martínez
              </h2>
              <p className="text-lg font-semibold text-blue-600 mb-4">
                Especialista en Infraestructura Geoespacial y Gemelos Digitales
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Líder estratégico con más de 20 años de experiencia transformando datos complejos en activos de decisión para los sectores público y privado. Pionero en la implementación del primer Gemelo Digital en Colombia y experto en transformación digital urbana mediante arquitecturas ArcGIS Enterprise, analítica avanzada y Python.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-slate-800">Gestión Pública y Urbana</h4>
                  <p className="text-sm text-gray-600 mt-1">Experto en consultoría estratégica para Smart Cities, interoperabilidad y contratación pública tecnológica.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-slate-800">Experiencia Técnica</h4>
                  <p className="text-sm text-gray-600 mt-1">Especialista en BI (Power BI/Tableau), PostgreSQL/PostGIS y metodologías ágiles (SCRUM).</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-slate-800">Trayectoria Institucional</h4>
                  <p className="text-sm text-gray-600 mt-1">Liderazgo en la Alcaldía de Medellín, destacando la reingeniería de GeoMedellín y modelado 3D.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-slate-800">Formación y Docencia</h4>
                  <p className="text-sm text-gray-600 mt-1">Máster UPC. Docente en UPB, UdeA y EIA, y conferencista internacional en ciudades inteligentes.</p>
                </div>
              </div>

              {/* Enlaces a redes */}
              <div className="flex flex-row items-center gap-6 mt-8">
                <a 
                  href="https://www.linkedin.com/in/jordi-guerrero-55b84015/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-700 transition-colors duration-200 group"
                >
                  <div className="p-1.5 bg-slate-100 rounded-md group-hover:bg-blue-50 transition-colors">
                    <FaLinkedinIn className="size-4 text-slate-600 group-hover:text-blue-700" />
                  </div>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>

                <a 
                  href="https://github.com/jgeograf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-gray-900 transition-colors duration-200 group"
                >
                  <div className="p-1.5 bg-slate-100 rounded-md group-hover:bg-gray-200 transition-colors">
                    <FaGithub className="size-4 text-slate-600 group-hover:text-gray-900" />
                  </div>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>

            </div>
          </div>
        </div>

      </section>
    </>
  );
}