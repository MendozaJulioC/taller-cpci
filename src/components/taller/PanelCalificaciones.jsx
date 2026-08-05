// src/components/taller/PanelCalificaciones.jsx
'use client'

import { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Award,
  MessageSquare,
  Trash2,
  Save,
  Filter
} from 'lucide-react';

export default function PanelCalificaciones() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandido, setExpandido] = useState({});
  const [calificando, setCalificando] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    cargarParticipantes();
  }, []);

  const cargarParticipantes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/calificaciones?participantes=true');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar participantes');
      }

      setParticipantes(data.data || []);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTallerNombre = (tallerId) => {
    const nombres = {
      1: 'Taller 1: Plataforma Geográfica',
      2: 'Taller 2: Visualización de Datos',
      3: 'Taller 3: Historias de Datos Espaciales'
    };
    return nombres[tallerId] || `Taller ${tallerId}`;
  };

  const getStatusBadge = (archivo) => {
    if (!archivo || !archivo.archivo_subido) {
      return { color: 'bg-slate-100 text-slate-500', text: 'No subido', icon: <Clock className="w-3.5 h-3.5" /> };
    }
    if (archivo.calificado) {
      return archivo.aprobado 
        ? { color: 'bg-green-100 text-green-700', text: 'Aprobado', icon: <CheckCircle className="w-3.5 h-3.5" /> }
        : { color: 'bg-red-100 text-red-700', text: 'No aprobado', icon: <XCircle className="w-3.5 h-3.5" /> };
    }
    return { color: 'bg-amber-100 text-amber-700', text: 'En revisión', icon: <Clock className="w-3.5 h-3.5" /> };
  };

  const toggleExpandir = (participanteId) => {
    setExpandido(prev => ({
      ...prev,
      [participanteId]: !prev[participanteId]
    }));
  };

  const handleCalificacionChange = (participanteId, tallerId, value) => {
    const key = `${participanteId}-${tallerId}`;
    setCalificando(prev => ({
      ...prev,
      [key]: { 
        ...prev[key], 
        calificacion: value !== '' ? parseFloat(value) : null 
      }
    }));
    // Limpiar mensaje anterior
    setMensaje(prev => ({ ...prev, [key]: '' }));
  };

  const handleAprobadoChange = (participanteId, tallerId, value) => {
    const key = `${participanteId}-${tallerId}`;
    setCalificando(prev => ({
      ...prev,
      [key]: { ...prev[key], aprobado: value }
    }));
    setMensaje(prev => ({ ...prev, [key]: '' }));
  };

  const handleComentarioChange = (participanteId, tallerId, value) => {
    const key = `${participanteId}-${tallerId}`;
    setCalificando(prev => ({
      ...prev,
      [key]: { ...prev[key], comentarios: value }
    }));
    setMensaje(prev => ({ ...prev, [key]: '' }));
  };

  const guardarCalificacion = async (participanteId, tallerId) => {
    const key = `${participanteId}-${tallerId}`;
    const data = calificando[key] || {};

    // Validar que se haya ingresado una calificación
    if (data.calificacion === null || data.calificacion === undefined || data.calificacion === '') {
      setMensaje(prev => ({ ...prev, [key]: '⚠️ Ingresa una nota (0-10)' }));
      return;
    }

    // Validar que la calificación esté en el rango
    if (data.calificacion < 0 || data.calificacion > 10) {
      setMensaje(prev => ({ ...prev, [key]: '⚠️ La nota debe estar entre 0 y 10' }));
      return;
    }

    try {
      const response = await fetch('/api/calificaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inscripcion_id: participanteId,
          taller_id: tallerId,
          calificacion: data.calificacion,
          aprobado: data.aprobado || false,
          comentarios: data.comentarios || null
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Error al guardar calificación');
      }

      setMensaje(prev => ({ ...prev, [key]: '✅ Calificación guardada' }));
      
      // Recargar datos después de un momento
      setTimeout(() => {
        cargarParticipantes();
        // Limpiar estado de calificación y mensaje
        setCalificando(prev => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
        setMensaje(prev => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      setMensaje(prev => ({ ...prev, [key]: '❌ ' + error.message }));
    }
  };

  const eliminarArchivo = async (participanteId, tallerId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este archivo?')) return;

    try {
      const response = await fetch(`/api/calificaciones?inscripcionId=${participanteId}&tallerId=${tallerId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el archivo');
      }

      // Recargar datos
      await cargarParticipantes();
      alert('✅ Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al eliminar el archivo');
    }
  };

  // Filtrar participantes
  const participantesFiltrados = participantes.filter(p => {
    const nombreCompleto = `${p.nombres} ${p.apellidos}`.toLowerCase();
    const matchSearch = nombreCompleto.includes(searchTerm.toLowerCase()) ||
                        p.correo_electronico.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-slate-600">Cargando participantes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
        <p>❌ {error}</p>
        <button 
          onClick={cargarParticipantes}
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado del panel */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Panel de Calificaciones</h2>
              <p className="text-xs text-slate-500">Gestiona las calificaciones de los participantes</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar participante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Lista de participantes */}
      <div className="space-y-4">
        {participantesFiltrados.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 p-8 text-center text-slate-500">
            <p className="text-sm">No hay participantes registrados aún.</p>
          </div>
        ) : (
          participantesFiltrados.map((participante) => {
            const calificaciones = participante.calificaciones || [];
            const tieneArchivos = calificaciones.some(c => c.archivo_subido);
            const totalCalificados = calificaciones.filter(c => c.calificado).length;
            const totalTalleres = 3;

            return (
              <div key={participante.id} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                {/* Cabecera del participante */}
                <div 
                  className="p-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  onClick={() => toggleExpandir(participante.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">
                        {participante.nombres?.[0]}{participante.apellidos?.[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {participante.nombres} {participante.apellidos}
                        </h3>
                        <p className="text-xs text-slate-500">{participante.correo_electronico}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-slate-500">
                        Progreso: {totalCalificados}/{totalTalleres} talleres calificados
                      </span>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                        totalCalificados === totalTalleres ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {totalCalificados === totalTalleres ? '✅ Completado' : '⏳ En progreso'}
                      </span>
                      {expandido[participante.id] ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Detalles expandidos */}
                {expandido[participante.id] && (
                  <div className="border-t border-slate-200/60 p-4 space-y-4">
                    {calificaciones.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-4">
                        Este participante aún no ha subido ningún archivo.
                      </p>
                    ) : (
                      calificaciones.map((calificacion) => {
                        const status = getStatusBadge(calificacion);
                        const key = `${participante.id}-${calificacion.taller_id}`;
                        const califData = calificando[key] || {};

                        return (
                          <div key={calificacion.taller_id} className="bg-slate-50/50 rounded-xl p-4">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                              {/* Información del archivo */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.color}`}>
                                    {status.icon}
                                    {status.text}
                                  </span>
                                  <h4 className="text-sm font-medium text-slate-800">
                                    {getTallerNombre(calificacion.taller_id)}
                                  </h4>
                                </div>
                                
                                {calificacion.archivo_subido ? (
                                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                      <FileText className="w-3.5 h-3.5" />
                                      {calificacion.archivo_nombre}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3.5 h-3.5" />
                                      {calificacion.fecha_subida ? new Date(calificacion.fecha_subida).toLocaleDateString('es-ES') : '-'}
                                    </span>
                                    {calificacion.archivo_ruta && (
                                      <>
                                        <a
                                          href={calificacion.archivo_ruta}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800 transition-colors"
                                          title="Ver archivo"
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                        </a>
                                        <a
                                          href={calificacion.archivo_ruta}
                                          download={calificacion.archivo_nombre}
                                          className="text-blue-600 hover:text-blue-800 transition-colors"
                                          title="Descargar archivo"
                                        >
                                          <Download className="w-3.5 h-3.5" />
                                        </a>
                                        <button
                                          onClick={() => eliminarArchivo(participante.id, calificacion.taller_id)}
                                          className="text-red-400 hover:text-red-600 transition-colors"
                                          title="Eliminar archivo"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-xs text-slate-400 mt-1">Archivo no subido aún</p>
                                )}

                                {calificacion.calificado && (
                                  <div className="mt-2 flex items-center gap-3 text-xs">
                                    <span className={`font-medium ${calificacion.aprobado ? 'text-green-600' : 'text-red-600'}`}>
                                      <Award className="w-3.5 h-3.5 inline" />
                                      Calificación: {calificacion.calificacion !== null ? `${calificacion.calificacion}/10` : '-'}
                                    </span>
                                    {calificacion.comentarios && (
                                      <span className="text-slate-500 flex items-center gap-1">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        {calificacion.comentarios}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Panel de calificación */}
                              {calificacion.archivo_subido && (
                                <div className="lg:w-80 flex-shrink-0 bg-white rounded-lg p-3 border border-slate-200/60">
                                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                    Calificar taller
                                  </p>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <label className="text-xs text-slate-600 min-w-[70px]">Nota (0-10):</label>
                                      <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.5"
                                        defaultValue={calificacion.calificacion || ''}
                                        onChange={(e) => handleCalificacionChange(participante.id, calificacion.taller_id, e.target.value)}
                                        className="w-20 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Nota"
                                      />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <label className="text-xs text-slate-600 min-w-[70px]">Aprobado:</label>
                                      <input
                                        type="checkbox"
                                        defaultChecked={calificacion.aprobado || false}
                                        onChange={(e) => handleAprobadoChange(participante.id, calificacion.taller_id, e.target.checked)}
                                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                      />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <label className="text-xs text-slate-600 min-w-[70px]">Comentario:</label>
                                      <input
                                        type="text"
                                        defaultValue={calificacion.comentarios || ''}
                                        onChange={(e) => handleComentarioChange(participante.id, calificacion.taller_id, e.target.value)}
                                        className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Comentario..."
                                      />
                                    </div>
                                    {mensaje[key] && (
                                      <p className={`text-xs ${mensaje[key].includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                                        {mensaje[key]}
                                      </p>
                                    )}
                                    <button
                                      onClick={() => guardarCalificacion(participante.id, calificacion.taller_id)}
                                      className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                                    >
                                      <Save className="w-3.5 h-3.5" />
                                      Guardar calificación
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
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