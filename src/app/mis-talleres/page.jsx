// src/app/mis-talleres/page.jsx - Versión simplificada y corregida

'use client'

import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from 'next/link';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  Award,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronUp,
  Search,
  Save
} from 'lucide-react';

export default function MisTalleresPage() {
  const { usuario } = useAuth();
  const esFormador = usuario?.rol === 'formador';

  console.log('👤 Usuario:', usuario);
  console.log('🎯 Es formador:', esFormador);

  return (
    <>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/60 px-4 py-8 sm:py-12 md:py-16 antialiased">
          <div className="max-w-6xl mx-auto">
            
            {/* Botón volver */}
            <Link 
              href="/taller" 
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Volver al taller
            </Link>

            {/* Título de la página */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {esFormador ? '📋 Panel de Calificaciones' : '📁 Mis Talleres'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {esFormador 
                  ? 'Gestiona las calificaciones de todos los participantes' 
                  : 'Visualiza tus talleres subidos y sus calificaciones'}
              </p>
            </div>

            {/* Contenido según rol */}
            {esFormador ? (
              <PanelCalificaciones />
            ) : (
              <MisTalleresParticipante usuario={usuario} />
            )}

          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}

// ============================================
// COMPONENTE PARA PARTICIPANTES
// ============================================
function MisTalleresParticipante({ usuario }) {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const cargarArchivos = async () => {
      if (!usuario?.id) return;
      
      try {
        if (isMounted) setLoading(true);
        const response = await fetch(`/api/calificaciones?inscripcionId=${usuario.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error al cargar archivos');
        }

        if (isMounted) {
          setArchivos(data.data || []);
          setError(null);
        }
      } catch (error) {
        console.error('Error:', error);
        if (isMounted) setError(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargarArchivos();

    return () => {
      isMounted = false;
    };
  }, [usuario?.id]);

  const getTallerNombre = (tallerId) => {
    const nombres = {
      1: 'Taller 1: Plataforma Geográfica del Distrito de Medellín',
      2: 'Taller 2: Visualización de Datos',
      3: 'Taller 3: Historias de Datos Espaciales'
    };
    return nombres[tallerId] || `Taller ${tallerId}`;
  };

  const getStatusBadge = (archivo) => {
    if (!archivo?.archivo_subido) {
      return { color: 'bg-slate-100 text-slate-500', text: 'No subido', icon: <Clock className="w-4 h-4" /> };
    }
    if (archivo.calificado) {
      return archivo.aprobado 
        ? { color: 'bg-green-100 text-green-700', text: 'Aprobado', icon: <CheckCircle className="w-4 h-4" /> }
        : { color: 'bg-red-100 text-red-700', text: 'No aprobado', icon: <XCircle className="w-4 h-4" /> };
    }
    return { color: 'bg-amber-100 text-amber-700', text: 'En revisión', icon: <Clock className="w-4 h-4" /> };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Cargando tus talleres...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
        <p>❌ {error}</p>
        <button 
          onClick={() => {
            const recargar = async () => {
              setLoading(true);
              try {
                const response = await fetch(`/api/calificaciones?inscripcionId=${usuario.id}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setArchivos(data.data || []);
                setError(null);
              } catch (err) {
                setError(err.message);
              } finally {
                setLoading(false);
              }
            };
            recargar();
          }}
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">{archivos.length}</p>
            <p className="text-xs text-slate-500">Total talleres</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {archivos.filter(a => a.calificado && a.aprobado).length}
            </p>
            <p className="text-xs text-slate-500">Aprobados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {archivos.filter(a => a.calificado && !a.aprobado).length}
            </p>
            <p className="text-xs text-slate-500">No aprobados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">
              {archivos.filter(a => a.archivo_subido && !a.calificado).length}
            </p>
            <p className="text-xs text-slate-500">En revisión</p>
          </div>
        </div>
      </div>

      {/* Lista de talleres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((tallerId) => {
          const archivo = archivos.find(a => a.taller_id === tallerId);
          const status = archivo ? getStatusBadge(archivo) : { color: 'bg-slate-100 text-slate-500', text: 'No subido', icon: <Clock className="w-4 h-4" /> };
          
          return (
            <div key={tallerId} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      {status.icon}
                      {status.text}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Taller {tallerId}</span>
                </div>
                
                <h3 className="font-semibold text-slate-800 text-sm mb-2">
                  {getTallerNombre(tallerId)}
                </h3>
                
                {archivo?.archivo_subido ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="truncate">{archivo.archivo_nombre}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {archivo.fecha_subida ? new Date(archivo.fecha_subida).toLocaleDateString('es-ES') : '-'}
                    </div>
                    
                    {archivo.calificado && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60">
                        <div className="flex items-center gap-2 text-sm">
                          <Award className={`w-4 h-4 ${archivo.aprobado ? 'text-green-600' : 'text-red-600'}`} />
                          <span className={`font-medium ${archivo.aprobado ? 'text-green-600' : 'text-red-600'}`}>
                            {archivo.calificacion !== null ? `${archivo.calificacion}/10` : 'Sin calificar'}
                          </span>
                        </div>
                        {archivo.comentarios && (
                          <div className="mt-1 flex items-start gap-1 text-xs text-slate-500">
                            <MessageSquare className="w-3.5 h-3.5 mt-0.5" />
                            <span>{archivo.comentarios}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-3">
                      <a
                        href={archivo.archivo_ruta}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Ver
                      </a>
                      <a
                        href={archivo.archivo_ruta}
                        download={archivo.archivo_nombre}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Descargar
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 mt-2">
                    No has subido este taller aún
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE PARA FORMADORES - Panel de Calificaciones
// ============================================
function PanelCalificaciones() {
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

    if (data.calificacion === null || data.calificacion === undefined || data.calificacion === '') {
      setMensaje(prev => ({ ...prev, [key]: '⚠️ Ingresa una nota (0-10)' }));
      return;
    }

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
      
      setTimeout(() => {
        cargarParticipantes();
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

  const participantesFiltrados = participantes.filter(p => {
    const nombreCompleto = `${p.nombres} ${p.apellidos}`.toLowerCase();
    return nombreCompleto.includes(searchTerm.toLowerCase()) ||
           p.correo_electronico.toLowerCase().includes(searchTerm.toLowerCase());
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
      {/* Buscador y resumen */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                {participantesFiltrados.length} participantes
              </p>
              <p className="text-xs text-slate-500">Total de inscritos</p>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar participante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Lista de participantes */}
      {participantesFiltrados.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-8 text-center text-slate-500">
          <p className="text-sm">No hay participantes registrados aún.</p>
        </div>
      ) : (
        participantesFiltrados.map((participante) => {
          const calificaciones = Array.isArray(participante.calificaciones) 
            ? participante.calificaciones 
            : [];
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
                      Progreso: {totalCalificados}/{totalTalleres}
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

              {/* Talleres del participante */}
              {expandido[participante.id] && (
                <div className="border-t border-slate-200/60 p-4 space-y-4">
                  {[1, 2, 3].map((tallerId) => {
                    const calificacion = calificaciones.find(c => c.taller_id === tallerId);
                    const status = calificacion ? getStatusBadge(calificacion) : { 
                      color: 'bg-slate-100 text-slate-500', 
                      text: 'No subido', 
                      icon: <Clock className="w-3.5 h-3.5" /> 
                    };
                    const key = `${participante.id}-${tallerId}`;

                    return (
                      <div key={tallerId} className="bg-slate-50/50 rounded-xl p-4 border border-slate-200/40">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                          {/* Información del taller */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.color}`}>
                                {status.icon}
                                {status.text}
                              </span>
                              <h4 className="text-sm font-medium text-slate-800">
                                {getTallerNombre(tallerId)}
                              </h4>
                            </div>
                            
                            {calificacion?.archivo_subido ? (
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
                                      className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      Ver
                                    </a>
                                    <a
                                      href={calificacion.archivo_ruta}
                                      download={calificacion.archivo_nombre}
                                      className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      Descargar
                                    </a>
                                  </>
                                )}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400 mt-1">Archivo no subido aún</p>
                            )}

                            {calificacion?.calificado && (
                              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs bg-blue-50/50 rounded-lg p-2">
                                <span className={`font-medium flex items-center gap-1 ${calificacion.aprobado ? 'text-green-600' : 'text-red-600'}`}>
                                  <Award className="w-3.5 h-3.5" />
                                  Calificación: {calificacion.calificacion !== null ? `${calificacion.calificacion}/10` : 'Sin calificar'}
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
                          {calificacion?.archivo_subido && (
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
                                    onChange={(e) => handleCalificacionChange(participante.id, tallerId, e.target.value)}
                                    className="w-20 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Nota"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <label className="text-xs text-slate-600 min-w-[70px]">Aprobado:</label>
                                  <input
                                    type="checkbox"
                                    defaultChecked={calificacion.aprobado || false}
                                    onChange={(e) => handleAprobadoChange(participante.id, tallerId, e.target.checked)}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <label className="text-xs text-slate-600 min-w-[70px]">Comentario:</label>
                                  <input
                                    type="text"
                                    defaultValue={calificacion.comentarios || ''}
                                    onChange={(e) => handleComentarioChange(participante.id, tallerId, e.target.value)}
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
                                  onClick={() => guardarCalificacion(participante.id, tallerId)}
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
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}