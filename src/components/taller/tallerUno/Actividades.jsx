'use client'

import { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Target, 
  Users, 
  MapPin, 
  BarChart3, 
  Database, 
  Globe, 
  Award,
  CheckCircle,
  ArrowRight,
  FileText,
  Presentation,
  Code,
  Layers,
  GitBranch,
  BookOpen,
  Monitor,
  Smartphone,
  Map
} from 'lucide-react';

export default function ActividadesTallerUno() {
  const [actividadActiva, setActividadActiva] = useState(1);

  const actividades = [
    {
      id: 1,
      titulo: 'Aspectos Generales del Taller',
      duracion: '40-50 minutos',
      icono: <BookOpen className="w-5 h-5" />,
      color: 'blue',
      dinamica: [
        'Presentación de los objetivos del taller y las actividades a realizar para la obtención del certificado.',
        'Explicación de los datos del ejercicio y dónde acceder a ellos (repositorio). En este se encontrarán los datos (en varios formatos) y sus respectivos diccionarios de datos.',
        'Explicación de la plataforma geográfica de Medellín desde una parte generalista.',
        'Explicación de las herramientas/aplicaciones de Subsecretaría de Catastro (GICAT, avance del modelo catastro multipropósito, LADM_COL).'
      ],
      reto: 'Familiarización con los conceptos generales del taller y las herramientas que se utilizarán durante la jornada.',
      resultados: 'Comprensión del alcance del taller y familiarización con las herramientas y datos a utilizar.'
    },
    {
      id: 2,
      titulo: 'Funcionalidades GeoMedellín',
      duracion: '45 minutos',
      icono: <Globe className="w-5 h-5" />,
      color: 'emerald',
      dinamica: [
        'Los participantes ingresan al portal GeoMedellín.',
        'Recorrido guiado con el facilitador por las diferentes secciones del portal.',
        'Exploración interactiva de las funcionalidades y herramientas disponibles.',
        'Ejercicios prácticos de usabilidad en el Catálogo Geográfico y descarga de datos abiertos.'
      ],
      reto: 'Realizar ejercicios de usabilidad de las herramientas para la calidad de los datos (Catálogo Geográfico) y descarga de datos abiertos analizando las diferentes opciones que existen.',
      resultados: ['Entregar respuestas al enunciado de la actividad 2.'],
      // Añadimos el enlace como metadata para la actividad
      enlaceTexto: 'GeoMedellín',
      enlaceUrl: 'https://www.medellin.gov.co/geomedellin'
    },
    {
      id: 3,
      titulo: 'Funcionalidades Mapas Medellín',
      duracion: '60 minutos',
      icono: <Map className="w-5 h-5" />,
      color: 'purple',
      dinamica: [
        'Los participantes ingresan al visor Mapas Medellín.',
        'Recorrido guiado con el facilitador por las diferentes secciones del visor.',
        'Exploración interactiva de las herramientas de visualización y análisis.',
        'Ejercicio práctico de creación de mapas con información catastral.'
      ],
      reto: 'Crear un mapa con información catastral usando las herramientas mostradas durante el recorrido guiado.',
      resultados: ['Entregar mapa realizado en la actividad 3.']
    },
    {
      id: 4,
      titulo: 'Ejercicio con Plataforma Catastro',
      duracion: 'Pendiente de validación',
      icono: <Database className="w-5 h-5" />,
      color: 'amber',
      dinamica: [
        'Ejercicio práctico con la plataforma de catastro.',
        'Aplicación de los conocimientos adquiridos durante el taller.',
        'Uso de las herramientas de la Subsecretaría de Catastro.'
      ],
      reto: 'Desarrollar el ejercicio propuesto con la plataforma de catastro, aplicando las herramientas y funcionalidades aprendidas.',
      resultados: ['Entregar ejercicio realizado con la plataforma de catastro.']
    }
  ];

  const colores = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      gradient: 'from-blue-500 to-blue-600',
      hover: 'hover:border-blue-300',
      badge: 'bg-blue-100 text-blue-700',
      icon: 'text-blue-500'
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      gradient: 'from-emerald-500 to-emerald-600',
      hover: 'hover:border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-700',
      icon: 'text-emerald-500'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      gradient: 'from-purple-500 to-purple-600',
      hover: 'hover:border-purple-300',
      badge: 'bg-purple-100 text-purple-700',
      icon: 'text-purple-500'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      gradient: 'from-amber-500 to-amber-600',
      hover: 'hover:border-amber-300',
      badge: 'bg-amber-100 text-amber-700',
      icon: 'text-amber-500'
    }
  };

  const infoGeneral = {
    duracionTotal: '2.5 - 3 horas',
    fecha: '31 de agosto (tentativo)',
    modalidad: 'Presencial / Virtual',
    participantes: 'Individual'
  };

  // Función para renderizar dinámica con enlaces
  const renderDinamica = (item, index, enlaceTexto, enlaceUrl) => {
    if (enlaceTexto && item.includes(enlaceTexto)) {
      const parts = item.split(enlaceTexto);
      return (
        <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-blue-500 font-bold mt-0.5">▸</span>
          <span>
            {parts[0]}
            <a 
              href={enlaceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-medium hover:bg-blue-50 px-1 rounded transition-colors"
            >
              {enlaceTexto}
            </a>
            {parts[1]}
          </span>
        </li>
      );
    }
    return (
      <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
        <span className="text-blue-500 font-bold mt-0.5">▸</span>
        <span>{item}</span>
      </li>
    );
  };

  return (
    <div className="space-y-8">
        {/* Título del Taller Uno */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-200"></div>
        <div className="flex items-center gap-3 px-4 py-2 bg-blue-50/80 rounded-full border border-blue-200/50">
          <span className="text-lg">🗺️</span>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            Taller Uno
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          <span className="text-xs font-medium text-blue-600">
            Plataforma Geográfica
          </span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-200"></div>
      </div>
      {/* Encabezado del Taller */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Taller 1
              </span>
              <span className="bg-yellow-400/20 backdrop-blur-sm text-yellow-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {infoGeneral.duracionTotal}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Plataforma Geográfica del Distrito de Medellín
            </h2>
            <p className="text-blue-100 text-sm md:text-base mt-1 max-w-2xl">
              Familiarización con las herramientas geográficas del Distrito de Medellín 
              y realización de ejercicios básicos con información catastral
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-blue-200" />
              <span className="text-xs font-medium">{infoGeneral.fecha}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Users className="w-4 h-4 text-blue-200" />
              <span className="text-xs font-medium">{infoGeneral.participantes}</span>
            </div>
          </div>
        </div>

        {/* Objetivo del Taller */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Objetivo</p>
              <p className="text-sm text-blue-50">
                Familiarizar a los asistentes del taller con las herramientas geográficas que 
                dispone el Distrito de Medellín y realización de ejercicios básicos con información catastral.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logística */}
      <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-xl p-4 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-5 h-5 text-slate-600" />
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Logística del Taller</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Disponer de usuario para acceder a sección privada de GeoMedellín/Mapas Medellín',
            'Acceso a la plataforma GeoMedellín',
            'Conexión a internet estable para navegación',
            'Repositorio con datos del ejercicio y diccionarios de datos',
            'Ejercicios individuales'
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actividades */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200"></div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="text-base">📋</span>
            Actividades del Taller
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200"></div>
        </div>

        {/* Navegación por actividades */}
        <div className="flex flex-wrap gap-2 mb-6">
          {actividades.map((act) => {
            const color = colores[act.color];
            return (
              <button
                key={act.id}
                onClick={() => setActividadActiva(act.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  actividadActiva === act.id
                    ? `bg-gradient-to-r ${color.gradient} text-white shadow-lg shadow-${act.color}-500/20`
                    : `bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-md`
                }`}
              >
                {act.icono}
                <span className="hidden sm:inline">Actividad {act.id}</span>
                <span className="sm:hidden">{act.id}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido de la actividad seleccionada */}
        {actividades.map((act) => {
          if (actividadActiva !== act.id) return null;
          const color = colores[act.color];

          return (
            <div
              key={act.id}
              className={`bg-white border ${color.border} rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 animate-in slide-in-from-bottom-4 duration-300`}
            >
              {/* Cabecera */}
              <div className={`bg-gradient-to-r ${color.gradient} px-6 py-4 flex flex-wrap items-center justify-between gap-3`}>
                <div className="flex items-center gap-3 text-white">
                  <div className="bg-white/20 p-2 rounded-lg">
                    {act.icono}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Actividad {act.id}</h4>
                    <p className="text-white/80 text-sm">{act.titulo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{act.duracion}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-6">
                {/* Dinámica */}
                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                    Dinámica
                  </h5>
                  <ul className="space-y-2">
                    {act.dinamica.map((item, index) => 
                      renderDinamica(item, index, act.enlaceTexto, act.enlaceUrl)
                    )}
                  </ul>
                </div>

                {/* Reto */}
                <div className={`bg-${act.color}-50/50 border ${color.border} rounded-xl p-4`}>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                    Reto
                  </h5>
                  <p className="text-sm text-slate-700 leading-relaxed">{act.reto}</p>
                </div>

                {/* Resultados */}
                <div className={`bg-${act.color}-50/30 border ${color.border} rounded-xl p-4`}>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                    Resultados Esperados
                  </h5>
                  {Array.isArray(act.resultados) ? (
                    <ul className="space-y-1">
                      {act.resultados.map((resultado, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{resultado}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-700">{act.resultados}</p>
                  )}
                </div>

                {/* Evaluación - Solo para actividades 2, 3 y 4 */}
                {(act.id === 2 || act.id === 3 || act.id === 4) && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Evaluación</h5>
                        <p className="text-sm text-slate-700 mt-1">
                          {act.id === 2 && 'Los participantes deberán entregar las respuestas al enunciado de la actividad 2.'}
                          {act.id === 3 && 'Los participantes deberán entregar el mapa creado durante la actividad 3.'}
                          {act.id === 4 && 'Los participantes deberán entregar el ejercicio realizado con la plataforma de catastro.'}
                        </p>
                        <div className="mt-2 bg-white/60 rounded-lg p-2 border border-blue-100/50">
                          <p className="text-xs text-slate-600 flex items-center gap-2">
                            <FileText className="w-3 h-3 text-blue-500" />
                            <span>
                              {act.id === 2 && 'Entregable: Respuestas actividad 2'}
                              {act.id === 3 && 'Entregable: Mapa creado actividad 3'}
                              {act.id === 4 && 'Entregable: Ejercicio plataforma catastro'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progreso del taller */}
      <div className="bg-white border border-slate-200/60 rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-slate-600" />
            <h4 className="text-sm font-bold text-slate-700">Progreso del Taller</h4>
          </div>
          <span className="text-xs font-medium text-slate-500">
            4 actividades · {infoGeneral.duracionTotal}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {actividades.map((act, index) => (
            <div key={act.id} className="flex-1 flex items-center gap-1">
              <div
                className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                  index < actividadActiva
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                    : index === actividadActiva - 1
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse'
                    : 'bg-slate-200'
                }`}
              />
              {index < actividades.length - 1 && (
                <ArrowRight className="w-3 h-3 text-slate-300" />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {actividades.map((act) => (
            <span key={act.id} className="text-[8px] font-medium text-slate-400 uppercase tracking-wider">
              Act {act.id}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}