'use client'
import { useState } from 'react';
import Image from 'next/image';

export default function ModalInscripcion({ isOpen, onClose }) {
  const [tableau, setTableau] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    telefono: '',
    cargo: '',
    pais: '',
    organizacion: '',
    tiene_power_bi: '',
    usa_otro_bi: '',
    otro_bi_nombre: '',
    tiene_arcgis_online: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORMDATA:", formData);

    try {
      setLoading(true);

      const response = await fetch('/api/inscripciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar inscripción');
      }

      setEnviado(true);

    } catch (error) {
      console.error(error);

      alert(
        error.message ||
        'No fue posible completar la inscripción'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200/60 shadow-2xl w-full max-w-[95vw] sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl overflow-hidden">
        
        {/* Header compacto - responsive */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-800 to-blue-400">
          <Image
            src="/Img/logocpci.png"
            alt="Logo CPCI"
            width={40}
            height={40}
            className="rounded-lg object-contain bg-white/10 p-0.5 w-8 h-8 sm:w-10 sm:h-10"
          />
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white leading-tight">Inscripción al taller</h2>
            <p className="text-[10px] sm:text-[11px] font-bold text-blue-100 leading-tight">Taller CPCI · Visualización Avanzada con herramientas BI</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-blue-200 hover:text-white transition-colors rounded-lg hover:bg-white/10 p-1"
            aria-label="Cerrar"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit}>
            {/* Layout responsive: mobile=stack, tablet+=2 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              {/* Columna Izquierda: Datos Personales y Profesionales */}
              <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 bg-gradient-to-b from-white to-slate-50/30">
                
                {/* Sección: Datos Personales */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-2.5 sm:h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-600 uppercase tracking-wider">Datos Personales</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-slate-500">Nombres *</label>
                      <input
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                        placeholder="Ej. María"
                        className="border border-slate-300 rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-[13px] lg:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-slate-500">Apellidos *</label>
                      <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                        placeholder="Ej. González"
                        className="border border-slate-300 rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-[13px] lg:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-slate-500">Correo electrónico *</label>
                      <input
                        type="email"
                        name="correo_electronico"
                        value={formData.correo_electronico}
                        onChange={handleChange}
                        required
                        placeholder="correo@org.com"
                        className="border border-slate-300 rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-[13px] lg:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-slate-500">Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+57 300 000 0000"
                        className="border border-slate-300 rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-[13px] lg:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Sección: Información Profesional */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-2.5 sm:h-3 bg-emerald-500 rounded-full"></div>
                    <h3 className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-600 uppercase tracking-wider">Información Profesional</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-slate-500">Cargo</label>
                      <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        placeholder="Ej. Analista GIS"
                        className="border border-slate-300 rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-[13px] lg:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-slate-500">País *</label>
                      <select
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        required
                        className="border border-slate-300 rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-[13px] lg:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                      >
                        <option value="">Selecciona...</option>
                        {['Argentina','Bolivia','Brasil','Chile','Colombia','Costa Rica','Cuba',
                          'Ecuador','El Salvador','España','Guatemala','Honduras','México',
                          'Nicaragua','Panamá','Paraguay','Perú','Portugal',
                          'República Dominicana','Uruguay','Venezuela'].map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-slate-500">Organización</label>
                    <input
                      type="text"
                      name="organizacion"
                      value={formData.organizacion}
                      onChange={handleChange}
                      placeholder="Nombre de tu institución u organización"
                      className="border border-slate-300 rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-[13px] lg:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Herramientas Técnicas */}
              <div className="p-3 sm:p-5 bg-gradient-to-b from-slate-50/50 to-white">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-2.5 sm:h-3 bg-purple-500 rounded-full"></div>
                    <h3 className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Herramientas Técnicas
                    </h3>
                  </div>

                  {/* Power BI */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2.5 sm:p-3 lg:p-4 border border-blue-100/50">
                    <p className="text-[11px] sm:text-[12px] lg:text-sm font-medium text-slate-700 mb-2">
                      ¿Cuentas con Power BI?
                    </p>

                    <div className="flex gap-2">
                      {["Sí", "No"].map((op) => (
                        <label
                          key={op}
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md bg-white border border-slate-200 text-[11px] sm:text-[12px] lg:text-sm text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all flex-1 justify-center"
                        >
                          <input
                            type="radio"
                            name="tiene_power_bi"
                            value={op === "Sí"}
                            checked={
                              formData.tiene_power_bi === String(op === "Sí")
                            }
                            onChange={handleChange}
                            className="accent-blue-600 w-3 h-3 sm:w-3.5 sm:h-3.5"
                          />
                          {op}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Otro Software BI */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2.5 sm:p-3 lg:p-4 border border-blue-100/50">
                    <p className="text-[11px] sm:text-[12px] lg:text-sm font-medium text-slate-700 mb-2">
                      ¿Usas otro software BI?
                    </p>

                    <div className="flex gap-2 mb-2">
                      {["Sí", "No"].map((op) => (
                        <label
                          key={op}
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md bg-white border border-slate-200 text-[11px] sm:text-[12px] lg:text-sm text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all flex-1 justify-center"
                        >
                          <input
                            type="radio"
                            name="usa_otro_bi"
                            value={op === "Sí"}
                            checked={
                              formData.usa_otro_bi === String(op === "Sí")
                            }
                            onChange={(e) => {
                              handleChange(e);
                              setTableau(op);
                            }}
                            className="accent-blue-600 w-3 h-3 sm:w-3.5 sm:h-3.5"
                          />
                          {op}
                        </label>
                      ))}
                    </div>

                    {tableau === "Sí" && (
                      <div className="animate-fadeIn">
                        <input
                          type="text"
                          name="otro_bi_nombre"
                          value={formData.otro_bi_nombre}
                          onChange={handleChange}
                          placeholder="¿Cuál software usas?"
                          className="w-full border border-blue-200 rounded-md px-2.5 py-1.5 sm:py-2 text-[11px] sm:text-[12px] lg:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {/* ArcGIS */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2.5 sm:p-3 lg:p-4 border border-blue-100/50">
                    <p className="text-[11px] sm:text-[12px] lg:text-sm font-medium text-slate-700 mb-2">
                      ¿Tienes cuenta de ArcGIS Online?
                    </p>

                    <div className="flex gap-2">
                      {["Sí", "No"].map((op) => (
                        <label
                          key={op}
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md bg-white border border-slate-200 text-[11px] sm:text-[12px] lg:text-sm text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all flex-1 justify-center"
                        >
                          <input
                            type="radio"
                            name="tiene_arcgis_online"
                            value={op === "Sí"}
                            checked={
                              formData.tiene_arcgis_online === String(op === "Sí")
                            }
                            onChange={handleChange}
                            className="accent-blue-600 w-3 h-3 sm:w-3.5 sm:h-3.5"
                          />
                          {op}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Nota informativa */}
                  <div className="bg-amber-50/80 border border-amber-200/60 rounded-lg p-2 sm:p-2.5">
                    <p className="text-[10px] sm:text-[11px] lg:text-xs text-amber-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="text-amber-500 mt-0.5 text-xs">💡</span>
                      <span>
                        No necesitas tener todas las herramientas. El taller se adapta a tu
                        nivel.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer compacto - responsive */}
            <div className="flex gap-2 sm:gap-2.5 px-3 sm:px-5 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-1.5 sm:py-2 lg:py-2.5 text-[11px] sm:text-[12px] lg:text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-[2] py-1.5 sm:py-2 lg:py-2.5 text-[11px] sm:text-[12px] lg:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/30"
              >
                Enviar inscripción
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 text-center gap-3 bg-gradient-to-b from-white to-green-50/30">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900">¡Inscripción enviada!</h3>
            <p className="text-[11px] sm:text-[13px] lg:text-sm text-slate-600 leading-relaxed max-w-xs">
              Gracias por registrarte al Taller CPCI.<br />
              Recibirás un correo de confirmación pronto.
            </p>
            <button
              onClick={onClose}
              className="mt-2 sm:mt-3 px-4 sm:px-5 py-2 lg:py-2.5 text-[11px] sm:text-[13px] lg:text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
            >
              Cerrar ventana
            </button>
          </div>
        )}
      </div>
    </div>
  );
}