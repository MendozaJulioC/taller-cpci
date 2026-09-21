// src/components/taller/CapasDatos.jsx
'use client'

import { useState } from 'react';
import { Database, Download, TrendingUp, Map, FileArchive } from 'lucide-react';

export default function CapasDatos() {
  const [descargando, setDescargando] = useState(null);
  const [descargaHabilitada, setDescargaHabilitada] = useState(false);

  // 👇 Configuración de los 2 talleres con sus ZIP
  const talleres = [
    {
      id: 2,
      nombre: 'Taller 2',
      titulo: 'Visualización de Datos',
      descripcion: 'Descarga todo el material de datos necesario para el Taller 2.',
      url: '/data/CapasTaller02.zip',
      nombreArchivo: 'CapasTaller02.zip',
      color: 'emerald',
      icono: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: 3,
      nombre: 'Taller 3',
      titulo: 'Historias de Datos Espaciales',
      descripcion: 'Descarga todo el material de datos necesario para el Taller 3.',
      url: '/data/CapasTaller03.zip',
      nombreArchivo: 'CapasTaller03.zip',
      color: 'purple',
      icono: <Map className="w-6 h-6" />,
    },
  ];

  // 👇 Función para descargar el ZIP
  const handleDescargar = (taller) => {
    try {
      setDescargando(taller.id);

      const link = document.createElement('a');
      link.href = taller.url;
      link.download = taller.nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setDescargando(null), 2000);
    } catch (error) {
      console.error('Error al descargar:', error);
      setDescargando(null);
    }
  };

  // 👇 Colores por taller
  const colores = {
    emerald: {
      gradient: 'from-emerald-500 to-emerald-600',
      gradientHover: 'hover:from-emerald-600 hover:to-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      shadow: 'shadow-emerald-500/20',
      icon: 'text-emerald-600',
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      gradientHover: 'hover:from-purple-600 hover:to-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      shadow: 'shadow-purple-500/20',
      icon: 'text-purple-600',
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/30 overflow-hidden">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-white/80" />
          <div>
            <h3 className="text-white font-bold text-sm">Capas de Datos del Taller</h3>
            <p className="text-blue-100 text-[10px] font-medium">
              Descarga el material de datos para cada taller
            </p>
          </div>
        </div>
      </div>

      {/* Contenido: 2 botones */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {talleres.map((taller) => {
            const color = colores[taller.color];
            const estaDescargando = descargando === taller.id;

            return (
              <div
                key={taller.id}
                className={`bg-gradient-to-br ${color.bg} border-2 ${color.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Icono y badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-white rounded-xl shadow-sm ${color.icon}`}>
                    {taller.icono}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-white ${color.text} uppercase tracking-wider`}>
                    {taller.nombre}
                  </span>
                </div>

                {/* Título y descripción */}
                <h4 className={`text-lg font-bold ${color.text} mb-2`}>
                  {taller.titulo}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {taller.descripcion}
                </p>

                {/* Botón de descarga */}
                <button
                  onClick={() => handleDescargar(taller)}
                  disabled={estaDescargando || !descargaHabilitada}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                    !descargaHabilitada
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-60 shadow-none'
                      : `bg-gradient-to-r ${color.gradient} ${color.gradientHover} text-white shadow-lg ${color.shadow} hover:shadow-xl disabled:opacity-70 disabled:cursor-wait`
                  }`}
                >
                  {estaDescargando ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Descargando...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Descargar {taller.nombre}
                      <FileArchive className="w-4 h-4 ml-1 opacity-70" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Nota informativa */}
        <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs text-slate-600 flex items-start gap-2">
            <span className="text-blue-500 text-sm">💡</span>
            <span>
              Cada archivo ZIP contiene <strong>todo el material de datos</strong> necesario para el taller.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}