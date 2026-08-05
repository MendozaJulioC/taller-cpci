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
  Map,
  PenTool,
  Book,
  Share2,
  FileCode,
  Download,
  Upload,
  File,
  X
} from 'lucide-react';

export default function ActividadesTallerDos({ usuario }) {
  const [actividadActiva, setActividadActiva] = useState(1);
  const [cargandoArchivo, setCargandoArchivo] = useState(false);
  const [archivoSubido, setArchivoSubido] = useState(null);
  const [mensajeSubida, setMensajeSubida] = useState('');

  const actividades = [
    {
      id: 1,
      titulo: 'Aspectos Generales del Taller',
      duracion: '30-40 minutos',
      icono: <BookOpen className="w-5 h-5" />,
      color: 'blue',
      dinamica: [
        'Presentación de los objetivos del taller y las actividades a realizar para la obtención del certificado.',
        'Explicación de los datos del ejercicio y dónde acceder a ellos (repositorio). En este se encontrarán los datos (en varios formatos) y sus respectivos diccionarios de datos.',
        'Explicación breve de la plataforma GeoMedellín y el visor Mapas Medellín enfocado a visualización y descarga de datos (tablero estadísticas). Esta presentación se dispondrá también en el repositorio.',
        'En caso que para los ejercicios se requiera de información espacial de apoyo, los participantes podrán descargar la información desde GeoMedellín.'
      ],
      reto: 'Los participantes recibirán información de 3 comunas de Medellín (Comuna 1: Popular, Comuna 7: Robledo y Comuna 14: El Poblado). El objetivo es caracterizar elementos comunes y diferenciales, mostrando la información en formato resumen ejecutivo para tomadores de decisiones.',
      resultados: 'Comprensión del alcance del taller y familiarización con las herramientas y datos a utilizar.'
    },
    {
      id: 2,
      titulo: 'Health Check de la Base Espacial (Conexión y limpieza)',
      duracion: '45 minutos',
      icono: <Database className="w-5 h-5" />,
      color: 'emerald',
      dinamica: [
        'Conexión de datos a Power BI mediante carga de archivo (o en caso de que se disponga) conexión a URL.',
        'Exploración de los datos y realización de procesos básicos de ETL (Extracción, Transformación y Carga).',
        'Identificación de inconsistencias comunes en bases de datos espaciales.'
      ],
      reto: 'Identificar y corregir inconsistencias comunes como predios con área cero y registros duplicados antes de cargar los datos al modelo.',
      resultados: [
        'Procesos realizados para la limpieza de los datos.',
        'Modelo de datos utilizado para la realización del ejercicio.'
      ]
    },
    {
      id: 3,
      titulo: 'Visualización de Información Geográfica',
      duracion: '45 minutos',
      icono: <Layers className="w-5 h-5" />,
      color: 'purple',
      dinamica: [
        'Exploración de las diferentes opciones para visualizar información geográfica: capas de puntos y capas poligonales.',
        'Mostrar las diferencias entre ArcGIS for Power BI para usuarios públicos vs cuentas organizacionales.',
        'Creación de visualizaciones con la información disponible o mediante nuevas medidas.'
      ],
      reto: 'Crear diferentes visualizaciones geográficas ya sea con la información disponible o generada mediante uso de nuevas medidas y generar la medida "Relación IBI" (valor comercial vs avalúo catastral).',
      resultados: 'Objetos visuales geográficos que permitan analizar la distribución territorial de los indicadores clave.'
    },
    {
      id: 4,
      titulo: 'Simulación para Tomadores de Decisión (Roleplay)',
      duracion: '30 minutos',
      icono: <Presentation className="w-5 h-5" />,
      color: 'amber',
      dinamica: [
        'Trabajo por equipos representando entidades catastrales.',
        'Presentación de resúmenes ejecutivos de cada equipo (3-5 minutos por equipo).',
        'Retroalimentación y comentarios entre equipos sobre los trabajos mostrados.',
        'Evaluación de los proyectos presentados por todos los participantes del taller.'
      ],
      reto: 'Elaborar un proyecto en Power BI utilizando los objetos visuales que consideren importantes que muestren la información más estratégica para ayudar a directivos y tomadores de decisiones a comprender la situación territorial.',
      resultados: [
        'Versión final del tablero con información clara y estratégica.',
        'El proyecto con mejor valoración se publicará en el portal GeoMedellín.'
      ]
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
    fecha: '26 de agosto - 08:00 a 11:00 hora colombia / 15:00 a 18:00 hora España',
    modalidad: 'Presencial / Virtual',
    participantes: 'Individual con presentación en equipos'
  };

  // Enlaces importantes
  const enlaces = {
    geomedellin: 'https://www.medellin.gov.co/geomedellin',
    catastrobogota: 'https://www.catastrobogota.gov.co/',
    geojsonio: 'https://geojson.io/'
  };

  // Función para descargar el PDF de la propuesta del Taller 2
  const handleDescargarPropuesta = () => {
    const url = '/data/Propuesta técnica y económica - Taller 2.pdf';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Propuesta técnica y económica - Taller 2.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para manejar la subida del archivo del Taller 2
  // Dentro de cada componente de taller, actualiza la función handleSubirArchivo:

  const handleSubirArchivo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMensajeSubida('⚠️ Solo se permiten archivos PDF');
      setTimeout(() => setMensajeSubida(''), 3000);
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setMensajeSubida('⚠️ El archivo no debe superar los 20MB');
      setTimeout(() => setMensajeSubida(''), 3000);
      return;
    }

    setCargandoArchivo(true);
    setMensajeSubida('');

    try {
      const formData = new FormData();
      formData.append('archivo', file);
      formData.append('taller', 'taller1'); // Cambiar según el taller (taller1, taller2, taller3)
      formData.append('email', usuario?.correo_electronico || ''); // 👈 AÑADIR EMAIL

      const response = await fetch('/api/upload-taller', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al subir el archivo');
      }

      setArchivoSubido(file.name);
      setMensajeSubida('✅ Archivo subido correctamente');
      setTimeout(() => setMensajeSubida(''), 3000);
    } catch (error) {
      console.error('Error al subir archivo:', error);
      setMensajeSubida('❌ Error al subir el archivo. Intenta nuevamente.');
      setTimeout(() => setMensajeSubida(''), 3000);
    } finally {
      setCargandoArchivo(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-8">
        {/* Título del Taller Dos */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-200"></div>
        <div className="flex items-center gap-3 px-4 py-2 bg-blue-50/80 rounded-full border border-blue-200/50">
          <span className="text-lg">📊</span>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
            Taller Dos
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          <span className="text-xs font-medium text-blue-600">
            Visualización de Datos
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
                Taller 2
              </span>
              <span className="bg-yellow-400/20 backdrop-blur-sm text-yellow-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {infoGeneral.duracionTotal}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Visualización de Datos
            </h2>
            <p className="text-blue-100 text-sm md:text-base mt-1 max-w-2xl">
              Transformar datos crudos de bases espaciales en herramientas de decisión estratégica
              a partir de herramientas de inteligencia de negocio
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
                Transformar datos crudos de bases espaciales en herramientas de decisión estratégica
                a partir de herramientas de inteligencia de negocio.
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
            'Cuentas organizacionales ArcGIS Online para articuladores',
            'Carpeta en ArcGIS Online para organizar y depositar elementos',
            'Cuentas organizacionales ArcGIS Online para participantes',
            'Usuario publicador en Power BI para tableros abiertos',
            'Ejercicios individuales con presentación en equipos'
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enlaces importantes */}
      <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-200/50 rounded-xl p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-semibold text-slate-700">Recursos de apoyo:</span>
          <a
            href={enlaces.geomedellin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all"
          >
            <Globe className="w-4 h-4" />
            GeoMedellín
            <ArrowRight className="w-3 h-3" />
          </a>
          <a
            href={enlaces.catastrobogota}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-sm text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all"
          >
            <Map className="w-4 h-4" />
            Catastro Bogotá
            <ArrowRight className="w-3 h-3" />
          </a>
          <a
            href={enlaces.geojsonio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-sm text-green-700 hover:bg-purple-50 hover:border-purple-300 transition-all"
          >
            <FileCode className="w-4 h-4" />
            GeoJson Maps
            <ArrowRight className="w-3 h-3" />
          </a>
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
                    {act.dinamica.map((item, index) => {
                      const textoConEnlaces = item
                        .replace(/GeoMedellín/g, (match) => 
                          `<a href="${enlaces.geomedellin}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">${match}</a>`
                        )
                        .replace(/Catastro Bogotá/g, (match) => 
                          `<a href="${enlaces.catastrobogota}" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:text-purple-800 underline font-medium">${match}</a>`
                        );
                      return (
                        <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                          <span className="text-blue-500 font-bold mt-0.5">▸</span>
                          <span dangerouslySetInnerHTML={{ __html: textoConEnlaces }} />
                        </li>
                      );
                    })}
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

                {/* Evaluación */}
                {act.id === 4 && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Evaluación</h5>
                        <p className="text-sm text-slate-700 mt-1">
                          Los participantes evaluarán los trabajos presentados. El proyecto con mejor
                          valoración se publicará en el portal <strong>GeoMedellín</strong>.
                        </p>
                        <div className="mt-2 bg-white/60 rounded-lg p-2 border border-blue-100/50">
                          <p className="text-xs text-slate-600 flex items-center gap-2">
                            <FileText className="w-3 h-3 text-blue-500" />
                            <span>Entregable: *.pbix / *.pbip con resultados de actividades 2, 3 y 4</span>
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

      {/* Progreso del taller con botones de descarga y carga */}
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

        {/* Botones de descarga y carga */}
        <div className="mt-4 pt-4 border-t border-slate-200/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Botón Descargar Propuesta */}
              <button
                onClick={handleDescargarPropuesta}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30"
              >
                <Download className="w-4 h-4" />
                Descargar Taller
                <span className="text-[10px] text-blue-200 font-normal ml-1">(PDF)</span>
              </button>

              {/* Botón Cargar Taller Resuelto */}
              <div className="relative">
                <button
                  onClick={() => document.getElementById('upload-taller-2').click()}
                  disabled={cargandoArchivo}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    archivoSubido 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200' 
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  {cargandoArchivo ? 'Subiendo...' : archivoSubido ? 'Taller cargado ✓' : 'Cargar Taller Resuelto'}
                  <span className="text-[10px] text-slate-400 font-normal ml-1">(PDF)</span>
                </button>
                <input
                  id="upload-taller-2"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleSubirArchivo}
                  className="hidden"
                  disabled={cargandoArchivo}
                />
              </div>

              {/* Mensaje de estado */}
              {mensajeSubida && (
                <span className={`text-xs font-medium ${
                  mensajeSubida.includes('✅') 
                    ? 'text-emerald-600' 
                    : mensajeSubida.includes('❌') || mensajeSubida.includes('⚠️')
                    ? 'text-red-600'
                    : 'text-slate-500'
                }`}>
                  {mensajeSubida}
                </span>
              )}
            </div>

            {/* Indicador de archivo subido */}
            {archivoSubido && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <File className="w-3.5 h-3.5" />
                <span className="truncate max-w-[150px]">{archivoSubido}</span>
                <button
                  onClick={() => setArchivoSubido(null)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Sube tu taller resuelto en formato PDF (máximo 20MB)
          </p>
        </div>
      </div>
    </div>
  );
}