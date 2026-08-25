// src/components/ui/ModalParticipantes.jsx
'use client'

import { useState, useEffect } from 'react';
import { X, Users, Mail, MapPin, Building, Briefcase, Calendar, Shield } from 'lucide-react';

export default function ModalParticipantes({ isOpen, onClose }) {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  // 👇 DECLARAR LA FUNCIÓN ANTES DEL useEffect
  const cargarParticipantes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/inscripciones/participantes');
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

  // 👇 AHORA EL useEffect PUEDE USAR cargarParticipantes
  useEffect(() => {
    if (isOpen) {
      cargarParticipantes();
    }
  }, [isOpen]);

  const getRolColor = (rol) => {
    const colores = {
      participante: 'bg-blue-100 text-blue-700',
      formador: 'bg-purple-100 text-purple-700'
    };
    return colores[rol] || 'bg-slate-100 text-slate-700';
  };

  const getRolTexto = (rol) => {
    const roles = {
      participante: 'Participante',
      formador: 'Formador'
    };
    return roles[rol] || rol;
  };

  const participantesFiltrados = participantes.filter(p => {
    const nombreCompleto = `${p.nombres} ${p.apellidos}`.toLowerCase();
    const busquedaLower = busqueda.toLowerCase();
    return nombreCompleto.includes(busquedaLower) ||
           p.correo_electronico.toLowerCase().includes(busquedaLower) ||
           (p.pais && p.pais.toLowerCase().includes(busquedaLower)) ||
           (p.organizacion && p.organizacion.toLowerCase().includes(busquedaLower));
  });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Lista de Participantes</h2>
              <p className="text-blue-100 text-sm">
                {participantes.length} personas inscritas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Buscador */}
        <div className="px-6 py-4 border-b border-slate-200/60">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre, correo, país u organización..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto max-h-[55vh] p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-slate-600">Cargando participantes...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
              <p>❌ {error}</p>
              <button 
                onClick={cargarParticipantes}
                className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : participantesFiltrados.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-sm">No hay participantes que coincidan con la búsqueda.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {participantesFiltrados.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-slate-50/80 hover:bg-slate-100/80 rounded-xl p-4 border border-slate-200/60 transition-all hover:border-slate-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-800 text-sm">
                          {p.nombres} {p.apellidos}
                        </h3>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getRolColor(p.rol)}`}>
                          {getRolTexto(p.rol)}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          {p.correo_electronico}
                        </span>
                        {p.pais && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {p.pais}
                          </span>
                        )}
                        {p.organizacion && (
                          <span className="flex items-center gap-1">
                            <Building className="w-3.5 h-3.5" />
                            {p.organizacion}
                          </span>
                        )}
                        {p.cargo && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            {p.cargo}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 flex-shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      {p.created_at ? new Date(p.created_at).toLocaleDateString('es-ES') : '-'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-200/60 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-500">
            Mostrando {participantesFiltrados.length} de {participantes.length} participantes
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}