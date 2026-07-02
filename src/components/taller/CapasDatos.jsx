// src/components/taller/CapasDatos.jsx
'use client'

import { useState } from 'react';
import { Database, FileSpreadsheet, Map, FileJson, HardDrive, Download, X, Check, FileArchive, Layers } from 'lucide-react';

export default function CapasDatos() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [capasSeleccionadas, setCapasSeleccionadas] = useState([]);

  const capasData = [
    { 
      nombre: 'TallerComunas', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '423 KB',
      archivos: {
        geojson: '/data/ComunasMED.geojson'
      }
    },
    { 
      nombre: 'TallerBarrios', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '199 KB',
      archivos: {
        geojson: '/data/BarriosMED.geojson'
      }
    },
    { 
      nombre: 'TallerLotesPredios', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '12.01 MB',
      archivos: {
        geojson: '/data/LotesPredioMDE.geojson'
      }
    },
    { 
      nombre: 'TallerConstruccion', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '35 MB',
      archivos: {
        geojson: '/data/ConstruccionMDE.geojson'
      }
    },
    { 
      nombre: 'LímiteCatastralComunaCorregimiento', 
      shp: false, 
      geojson: false, 
      csv: false, 
      peso: '-'
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

  // Obtener solo las capas disponibles para descarga
  const capasDisponibles = capasData.filter(capa => capa.archivos?.geojson);

  // Desglose de pesos para LímiteCatastralComunaCorregimiento
  const desglosePesos = [
    { formato: 'SHP', peso: '687.9 MB', icono: <Map className="w-3 h-3" /> },
    { formato: 'GeoJSON', peso: '94.3 MB', icono: <FileJson className="w-3 h-3" /> },
    { formato: 'CSV', peso: '61.7 MB', icono: <FileSpreadsheet className="w-3 h-3" /> },
  ];

  // Calcular peso total de todas las capas disponibles
  const pesoTotal = capasDisponibles.reduce((total, capa) => {
    const pesoNumerico = parseFloat(capa.peso);
    if (!isNaN(pesoNumerico)) {
      return total + pesoNumerico;
    }
    return total;
  }, 0);

  // Función para descargar archivo individual
  const handleDownload = (url, nombreArchivo) => {
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

  // Abrir modal de descarga
  const abrirModalDescarga = () => {
    setCapasSeleccionadas(capasDisponibles.map(capa => capa.nombre));
    setModalAbierto(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  // Toggle selección de capa
  const toggleCapa = (nombre) => {
    setCapasSeleccionadas(prev => 
      prev.includes(nombre) 
        ? prev.filter(n => n !== nombre)
        : [...prev, nombre]
    );
  };

  // Seleccionar/Deseleccionar todas
  const toggleTodas = () => {
    if (capasSeleccionadas.length === capasDisponibles.length) {
      setCapasSeleccionadas([]);
    } else {
      setCapasSeleccionadas(capasDisponibles.map(capa => capa.nombre));
    }
  };

  // Descargar capas seleccionadas
  const descargarSeleccionadas = () => {
    const capasADescargar = capasDisponibles.filter(capa => 
      capasSeleccionadas.includes(capa.nombre)
    );
    
    capasADescargar.forEach(capa => {
      handleDownload(capa.archivos.geojson, getFileName(capa.archivos.geojson));
    });
    
    cerrarModal();
  };

  return (
    <>
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
                      <span className="text-xs text-slate-400">{capa.peso}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer de la tabla con desglose de pesos */}
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
            <div className="flex items-center gap-3 text-[9px] text-slate-500">
              <span className="font-medium text-slate-600">Desglose de pesos:</span>
              {desglosePesos.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded border border-slate-200/60">
                  {item.icono}
                  {item.peso}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/60">
            <div className="flex items-center gap-3 text-[10px] text-slate-600">
              <span className="font-medium">Peso total de capas disponibles:</span>
              <span className="font-bold text-blue-700">{pesoTotal.toFixed(2)} MB</span>
            </div>
            <button
              onClick={abrirModalDescarga}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 transition-all text-[10px] font-medium shadow-sm shadow-emerald-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar capas
            </button>
          </div>
        </div>
      </div>

      {/* Modal de descarga */}
      {modalAbierto && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && cerrarModal()}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <FileArchive className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-sm">Descargar Capas</h3>
                  <p className="text-emerald-100 text-[10px]">Selecciona las capas que deseas descargar</p>
                </div>
              </div>
              <button
                onClick={cerrarModal}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de capas */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <button
                  onClick={toggleTodas}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {capasSeleccionadas.length === capasDisponibles.length ? 'Deseleccionar todas' : 'Seleccionar todas'}
                </button>
                <span className="text-[10px] text-slate-500">
                  {capasSeleccionadas.length} de {capasDisponibles.length} seleccionadas
                </span>
              </div>

              {capasDisponibles.map((capa) => (
                <label
                  key={capa.nombre}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    capasSeleccionadas.includes(capa.nombre)
                      ? 'bg-emerald-50 border border-emerald-200'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={capasSeleccionadas.includes(capa.nombre)}
                    onChange={() => toggleCapa(capa.nombre)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{capa.nombre}</p>
                    <p className="text-[10px] text-slate-400">{capa.peso} · GeoJSON</p>
                  </div>
                  {capasSeleccionadas.includes(capa.nombre) && (
                    <Check className="w-4 h-4 text-emerald-600" />
                  )}
                </label>
              ))}
            </div>

            {/* Footer del modal */}
            <div className="bg-slate-50/80 border-t border-slate-200/60 px-6 py-4 flex gap-3">
              <button
                onClick={cerrarModal}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={descargarSeleccionadas}
                disabled={capasSeleccionadas.length === 0}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar ({capasSeleccionadas.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}