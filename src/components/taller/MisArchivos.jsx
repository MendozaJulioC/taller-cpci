// src/components/taller/MisArchivos.jsx
'use client'

import { useState, useEffect } from 'react';
import { FileText, Download, Eye, Calendar, CheckCircle, XCircle, Clock, Award, MessageSquare, Trash2 } from 'lucide-react';

export default function MisArchivos({ usuario }) {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    if (usuario?.id) {
      cargarArchivos();
    } else {
      setLoading(false);
      setError('No se encontró información del usuario');
    }
  }, [usuario]);

  const cargarArchivos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/calificaciones?inscripcionId=${usuario.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar archivos');
      }

      const archivosData = Array.isArray(data.data) ? data.data : [];
      setArchivos(archivosData);
    } catch (error) {
      console.error('Error al cargar archivos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarArchivo = async (tallerId, version = null) => {
    const mensaje = version 
      ? `¿Estás seguro de que deseas eliminar la versión ${version} de este taller?`
      : '¿Estás seguro de que deseas eliminar este taller?';
    
    if (!confirm(mensaje)) return;

    try {
      setEliminando(true);
      
      const url = version 
        ? `/api/calificaciones?inscripcionId=${usuario.id}&tallerId=${tallerId}&version=${version}`
        : `/api/calificaciones?inscripcionId=${usuario.id}&tallerId=${tallerId}`;
      
      const response = await fetch(url, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar el archivo');
      }

      // Recargar la lista de archivos
      await cargarArchivos();
      alert('✅ Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al eliminar el archivo: ' + error.message);
    } finally {
      setEliminando(false);
    }
  };

  const getTallerNombre = (tallerId) => {
    const nombres = {
      1: 'Taller 1: Plataforma Geográfica del Distrito de Medellín',
      2: 'Taller 2: Visualización de Datos',
      3: 'Taller 3: Historias de Datos Espaciales'
    };
    return nombres[tallerId] || `Taller ${tallerId}`;
  };

  const getStatusColor = (archivo) => {
    if (!archivo?.archivo_subido) return 'bg-slate-100 text-slate-500';
    if (archivo.calificado) {
      return archivo.aprobado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
    }
    return 'bg-amber-100 text-amber-700';
  };

  const getStatusText = (archivo) => {
    if (!archivo?.archivo_subido) return 'No subido';
    if (archivo.calificado) {
      return archivo.aprobado ? '✅ Aprobado' : '❌ No aprobado';
    }
    return '⏳ En revisión';
  };

  // Agrupar archivos por taller
  const archivosPorTaller = archivos.reduce((acc, archivo) => {
    if (!acc[archivo.taller_id]) {
      acc[archivo.taller_id] = [];
    }
    acc[archivo.taller_id].push(archivo);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Cargando tus archivos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
        <p>❌ {error}</p>
        <button 
          onClick={cargarArchivos}
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-white/80" />
          <div>
            <h3 className="text-white font-bold text-sm">Mis Archivos</h3>
            <p className="text-blue-100 text-[10px] font-medium">
              Archivos subidos de cada taller
            </p>
          </div>
        </div>
      </div>

      {/* Lista de archivos */}
      <div className="divide-y divide-slate-200">
        {Object.keys(archivosPorTaller).length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p className="text-sm">No has subido ningún archivo aún.</p>
            <p className="text-xs mt-1">Sube tus talleres desde la sección de cada taller.</p>
          </div>
        ) : (
          Object.keys(archivosPorTaller).map((tallerId) => {
            const versiones = archivosPorTaller[tallerId];
            const ultimaVersion = versiones[0]; // La primera es la más reciente
            const tieneCalificacion = ultimaVersion?.calificado;

            return (
              <div key={tallerId} className="p-4 hover:bg-slate-50/50 transition-colors border-b border-slate-100">
                {/* Información del taller */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(ultimaVersion)}`}>
                      {getStatusText(ultimaVersion)}
                    </span>
                    <h4 className="text-sm font-medium text-slate-800">
                      {getTallerNombre(parseInt(tallerId))}
                    </h4>
                    <span className="text-xs text-slate-400">
                      ({versiones.length} versión{versiones.length > 1 ? 'es' : ''})
                    </span>
                  </div>
                  
                  {/* Botón eliminar todo el taller */}
                  <button
                    onClick={() => eliminarArchivo(parseInt(tallerId))}
                    disabled={eliminando}
                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                    title="Eliminar todas las versiones de este taller"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar taller
                  </button>
                </div>
                
                {/* Mostrar cada versión */}
                <div className="mt-2 space-y-2">
                  {versiones.map((archivo, index) => (
                    <div key={archivo.version} className="ml-2 sm:ml-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 rounded-lg p-2 hover:bg-slate-100/50 transition-colors">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="text-slate-400 font-medium">v{archivo.version}</span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {archivo.archivo_nombre}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {archivo.fecha_subida ? new Date(archivo.fecha_subida).toLocaleDateString('es-ES') : '-'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {archivo.archivo_ruta && (
                          <>
                            <a
                              href={archivo.archivo_ruta}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Ver
                            </a>
                            <a
                              href={archivo.archivo_ruta}
                              download={archivo.archivo_nombre}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Descargar
                            </a>
                            {/* Botón eliminar versión específica */}
                            <button
                              onClick={() => eliminarArchivo(parseInt(tallerId), archivo.version)}
                              disabled={eliminando}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors disabled:opacity-50"
                              title="Eliminar esta versión"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mostrar calificación de la última versión */}
                {tieneCalificacion && (
                  <div className="mt-2 ml-2 sm:ml-4 flex flex-wrap items-center gap-3 text-xs bg-blue-50/50 rounded-lg p-2">
                    <span className={`font-medium flex items-center gap-1 ${ultimaVersion.aprobado ? 'text-green-600' : 'text-red-600'}`}>
                      <Award className="w-3.5 h-3.5" />
                      Calificación: {ultimaVersion.calificacion !== null ? `${ultimaVersion.calificacion}/10` : 'Sin calificar'}
                    </span>
                    {ultimaVersion.comentarios && (
                      <span className="text-slate-500 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {ultimaVersion.comentarios}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}