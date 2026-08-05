// src/app/perfil/page.jsx
'use client'

import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from 'next/link';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Briefcase,
  Award,
  Calendar,
  Shield
} from 'lucide-react';

export default function PerfilPage() {
  const { usuario } = useAuth();

  const getRolTexto = (rol) => {
    const roles = {
      participante: 'Participante',
      formador: 'Formador / Calificador'
    };
    return roles[rol] || 'Sin rol asignado';
  };

  const getRolColor = (rol) => {
    const colores = {
      participante: 'bg-blue-100 text-blue-700',
      formador: 'bg-purple-100 text-purple-700'
    };
    return colores[rol] || 'bg-slate-100 text-slate-700';
  };

  if (!usuario) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/60 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/60 px-4 py-8 sm:py-12 md:py-16 antialiased">
          <div className="max-w-4xl mx-auto">
            
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
                👤 Mi Perfil
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Visualiza tu información personal y detalles de tu cuenta
              </p>
            </div>

            {/* Tarjeta de perfil */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/30 overflow-hidden">
              
              {/* Cabecera con avatar y datos básicos */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-6 py-8 sm:px-8 sm:py-10 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl sm:text-5xl font-bold border-4 border-white/30 shadow-lg">
                      {usuario.nombres?.[0]}{usuario.apellidos?.[0]}
                    </div>
                  </div>
                  
                  {/* Información básica */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl sm:text-3xl font-bold">
                        {usuario.nombres} {usuario.apellidos}
                      </h2>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getRolColor(usuario.rol)}`}>
                        <Shield className="w-3.5 h-3.5" />
                        {getRolTexto(usuario.rol)}
                      </span>
                    </div>
                    <p className="text-blue-100 mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {usuario.correo_electronico}
                    </p>
                    <p className="text-blue-100/80 text-sm mt-2">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Usuario desde: {new Date().toLocaleDateString('es-ES')}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Detalles del perfil */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Información Personal
                  </h3>
                </div>

                {/* Grid de información */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombres */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Nombres
                    </label>
                    <p className="text-sm text-slate-800 font-medium">{usuario.nombres || '-'}</p>
                  </div>

                  {/* Apellidos */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Apellidos
                    </label>
                    <p className="text-sm text-slate-800 font-medium">{usuario.apellidos || '-'}</p>
                  </div>

                  {/* Correo electrónico */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Correo electrónico
                    </label>
                    <p className="text-sm text-slate-800 font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {usuario.correo_electronico || '-'}
                    </p>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Teléfono
                    </label>
                    <p className="text-sm text-slate-800 font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {usuario.telefono || 'No registrado'}
                    </p>
                  </div>

                  {/* País */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      País
                    </label>
                    <p className="text-sm text-slate-800 font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {usuario.pais || 'No registrado'}
                    </p>
                  </div>

                  {/* Cargo */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Cargo
                    </label>
                    <p className="text-sm text-slate-800 font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      {usuario.cargo || 'No registrado'}
                    </p>
                  </div>

                  {/* Organización */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Organización
                    </label>
                    <p className="text-sm text-slate-800 font-medium flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      {usuario.organizacion || 'No registrado'}
                    </p>
                  </div>
                </div>

                {/* Información de la cuenta */}
                <div className="mt-8 pt-6 border-t border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Información de la cuenta
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-50/80 rounded-xl p-4">
                      <span className="text-slate-500">Nombre de usuario</span>
                      <p className="font-medium text-slate-800">{usuario.username}</p>
                    </div>
                    <div className="bg-slate-50/80 rounded-xl p-4">
                      <span className="text-slate-500">Rol</span>
                      <p className={`font-medium ${usuario.rol === 'formador' ? 'text-purple-600' : 'text-blue-600'}`}>
                        {getRolTexto(usuario.rol)}
                      </p>
                    </div>
                    <div className="bg-slate-50/80 rounded-xl p-4">
                      <span className="text-slate-500">Estado de la cuenta</span>
                      <p className="font-medium text-green-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Activa
                      </p>
                    </div>
                    <div className="bg-slate-50/80 rounded-xl p-4">
                      <span className="text-slate-500">ID de usuario</span>
                      <p className="font-mono text-xs text-slate-600">#{usuario.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}