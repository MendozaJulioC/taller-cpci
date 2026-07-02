// src/components/taller/CapasDatos.jsx
'use client'

import { Database, FileSpreadsheet, Map, FileJson, HardDrive, Download } from 'lucide-react';

export default function CapasDatos() {
  const capasData = [
    { 
      nombre: 'TallerComunas', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '-',
      archivos: {
        geojson: '/data/ComunasMED.geojson'
      }
    },
    { 
      nombre: 'TallerBarrios', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '-',
      archivos: {
        geojson: '/data/BarriosMED.geojson'
      }
    },
    { 
      nombre: 'TallerLotesPredios', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '-',
      archivos: {
        geojson: '/data/LotesPredioMDE.geojson'
      }
    },
    { 
      nombre: 'TallerConstruccion', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '-',
      archivos: {
        geojson: '/data/ConstruccionMDE.geojson'
      }
    },
    { 
      nombre: 'LímiteCatastralComunaCorregimiento', 
      shp: false, 
      geojson: false, 
      csv: false, 
      peso: '843.9 MB'
    },
    { 
      nombre: 'LímiteCatastralBarrioVereda', 
      shp: false, 
      geojson: false, 
      csv: false, 
      peso: '-'
    },
    { 
      nombre: 'InventarioEquipamientos', 
      shp: false, 
      geojson: false, 
      csv: false, 
      peso: '-'
    },
    { 
      nombre: 'InventarioEspacioPublico', 
      shp: false, 
      geojson: false, 
      csv: false, 
      peso: '-'
    },
    { 
      nombre: 'RioMedellín', 
      shp: false, 
      geojson: false, 
      csv: false, 
      peso: '-'
    },
  ];

  // Desglose de pesos para LímiteCatastralComunaCorregimiento
  const desglosePesos = [
    { formato: 'SHP', peso: '687.9 MB', icono: <Map className="w-3 h-3" /> },
    { formato: 'GeoJSON', peso: '94.3 MB', icono: <FileJson className="w-3 h-3" /> },
    { formato: 'CSV', peso: '61.7 MB', icono: <FileSpreadsheet className="w-3 h-3" /> },
  ];

   // Función para descargar archivo
  const handleDownload = (url, nombreArchivo) => {
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para obtener el nombre del archivo desde la URL
  const getFileName = (url) => {
    return url.split('/').pop();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/30 overflow-hidden">
      {/* Encabezado de la tabla */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-white/80" />
          <div>
            <h3 className="text-white font-bold text-sm">Capas de Datos del Taller</h3>
            <p className="text-blue-100 text-[10px] font-medium">
              Datos espaciales disponibles para los ejercicios prácticos
            </p>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Capa de Datos
              </th>
              <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-1.5">
                  <Map className="w-3.5 h-3.5" />
                  SHP
                </div>
              </th>
              <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-1.5">
                  <FileJson className="w-3.5 h-3.5" />
                  GeoJSON
                </div>
              </th>
              <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  CSV
                </div>
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center justify-end gap-1.5">
                  <HardDrive className="w-3.5 h-3.5" />
                  Peso Total
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {capasData.map((capa, index) => {
              const esLímiteCatastral = capa.nombre === 'LímiteCatastralComunaCorregimiento';
              const tieneDescarga = capa.archivos?.geojson;
              
              return (
                <tr 
                  key={index}
                  className={`border-b border-slate-100 transition-colors ${
                    esLímiteCatastral 
                      ? 'bg-gradient-to-r from-blue-50/50 to-indigo-50/50 hover:from-blue-100/50 hover:to-indigo-100/50' 
                      : 'hover:bg-slate-50/50'
                  }`}
                >
                  {/* Nombre de la capa */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${
                        esLímiteCatastral ? 'text-blue-700' : 'text-slate-700'
                      }`}>
                        {capa.nombre}
                      </span>
                      {esLímiteCatastral && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[8px] font-bold uppercase tracking-wider">
                          Disponible
                        </span>
                      )}
                      {tieneDescarga && (
                        <button
                          onClick={() => handleDownload(capa.archivos.geojson, getFileName(capa.archivos.geojson))}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors text-[8px] font-bold uppercase tracking-wider"
                          title="Descargar archivo"
                        >
                          <Download className="w-2.5 h-2.5" />
                          Descargar
                        </button>
                      )}
                    </div>
                  </td>

                  {/* SHP */}
                  <td className="text-center px-4 py-3">
                    {capa.shp ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>

                  {/* GeoJSON */}
                  <td className="text-center px-4 py-3">
                    {capa.geojson ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>

                  {/* CSV */}
                  <td className="text-center px-4 py-3">
                    {capa.csv ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>

                  {/* Peso Total */}
                  <td className="px-4 py-3 text-right">
                    {esLímiteCatastral ? (
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-blue-700">{capa.peso}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {desglosePesos.map((item, idx) => (
                            <span key={idx} className="inline-flex items-center gap-0.5 text-[8px] text-slate-500 bg-white/80 px-1.5 py-0.5 rounded border border-slate-200/60">
                              {item.icono}
                              {item.peso}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">{capa.peso}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer de la tabla */}
      <div className="bg-slate-50/80 border-t border-slate-200/60 px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-600">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              Formato disponible
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-300">—</span>
              Formato no disponible
            </span>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-slate-400">
            <Database className="w-3 h-3" />
            <span>Datos para descarga en el repositorio del taller</span>
          </div>
        </div>
      </div>
    </div>
  );
}