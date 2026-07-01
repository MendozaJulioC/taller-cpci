'use client'
import { useState } from 'react';
import Image from 'next/image';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ModalInscripcion({ isOpen, onClose }) {
  const [tableau, setTableau] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert(
        "La contraseña debe tener mínimo 8 caracteres, una letra y un número."
      );
      return;
    }

    const { confirmPassword, ...rest } = formData;

    const dataToSend = {
      ...rest,
      tiene_power_bi: formData.tiene_power_bi === "Sí",
      usa_otro_bi: formData.usa_otro_bi === "Sí",
      tiene_arcgis_online: formData.tiene_arcgis_online === "Sí",
    };

    try {
      setLoading(true);

      const response = await fetch("/api/inscripciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Error al registrar inscripción"
        );
      }

      setEnviado(true);

      setFormData({
        password: "",
        confirmPassword: "",
        nombres: "",
        apellidos: "",
        correo_electronico: "",
        telefono: "",
        cargo: "",
        pais: "",
        organizacion: "",
        tiene_power_bi: "",
        usa_otro_bi: "",
        otro_bi_nombre: "",
        tiene_arcgis_online: "",
      });

      setTableau("");

    } catch (error) {
      console.error(error);
      alert(
        error.message || "No fue posible completar la inscripción"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200/60 shadow-2xl w-full max-w-[95vw] sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-hidden">
        
        {/* Header compacto */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-800 to-blue-400">
          <Image
            src="/Img/logocpci.png"
            alt="Logo CPCI"
            width={32}
            height={32}
            className="rounded-lg object-contain bg-white/10 p-0.5 w-7 h-7 sm:w-8 sm:h-8"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">Inscripción al taller</h2>
            <p className="text-[9px] sm:text-[10px] font-bold text-blue-100 leading-tight truncate">Taller CPCI · Visualización Avanzada</p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors rounded-lg hover:bg-white/10 p-1"
            aria-label="Cerrar"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                
                {/* Columna Izquierda */}
                <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3 bg-gradient-to-b from-white to-slate-50/30">
                  
                  {/* Datos Personales */}
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-2 sm:h-2.5 bg-blue-500 rounded-full"></div>
                      <h3 className="text-[9px] sm:text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Datos Personales</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Nombres *</label>
                        <input
                          type="text"
                          name="nombres"
                          value={formData.nombres}
                          onChange={handleChange}
                          required
                          placeholder="María"
                          className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Apellidos *</label>
                        <input
                          type="text"
                          name="apellidos"
                          value={formData.apellidos}
                          onChange={handleChange}
                          required
                          placeholder="González"
                          className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Correo electrónico *</label>
                      <input
                        type="email"
                        name="correo_electronico"
                        value={formData.correo_electronico}
                        onChange={handleChange}
                        required
                        placeholder="correo@org.com"
                        className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </div>

                    {/* Teléfono con selector mejorado */}
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">
                        Teléfono
                      </label>

                      <PhoneInput
                        country="co"
                        enableSearch
                        searchPlaceholder="Buscar país..."
                        value={formData.telefono}
                        onChange={(phone) =>
                          setFormData((prev) => ({
                            ...prev,
                            telefono: phone,
                          }))
                        }
                        containerStyle={{
                          width: "100%",
                        }}
                        inputStyle={{
                          width: "100%",
                          height: "38px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          paddingLeft: "55px",
                          fontSize: "13px",
                        }}
                        buttonStyle={{
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#fff",
                        }}
                      />
                    </div>
                  </div>

                  {/* Credenciales */}
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-2 sm:h-2.5 bg-indigo-500 rounded-full"></div>
                      <h3 className="text-[9px] sm:text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Credenciales</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Contraseña *</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength={8}
                          placeholder="Mínimo 8 caracteres"
                          className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Confirmar *</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          minLength={8}
                          placeholder="Repite contraseña"
                          className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Información Profesional */}
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-2 sm:h-2.5 bg-emerald-500 rounded-full"></div>
                      <h3 className="text-[9px] sm:text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Profesional</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Cargo</label>
                        <input
                          type="text"
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleChange}
                          placeholder="Analista GIS"
                          className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">País *</label>
                        <select
                          name="pais"
                          value={formData.pais}
                          onChange={handleChange}
                          required
                          className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
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

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Organización</label>
                      <input
                        type="text"
                        name="organizacion"
                        value={formData.organizacion}
                        onChange={handleChange}
                        placeholder="Nombre de tu institución"
                        className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Herramientas Técnicas */}
                <div className="p-3 sm:p-4 bg-gradient-to-b from-slate-50/50 to-white space-y-2.5">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-1 h-2 sm:h-2.5 bg-purple-500 rounded-full"></div>
                    <h3 className="text-[9px] sm:text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Herramientas</h3>
                  </div>

                  {/* Power BI */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 sm:p-2.5 border border-blue-100/50">
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-700 mb-1.5">¿Cuentas con Power BI?</p>
                    <div className="flex gap-1.5">
                      {["Sí", "No"].map((op) => (
                        <label
                          key={op}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] sm:text-[11px] text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all flex-1 justify-center"
                        >
                          <input
                            type="radio"
                            name="tiene_power_bi"
                            value={op}
                            checked={formData.tiene_power_bi === op}
                            onChange={handleChange}
                            className="accent-blue-600 w-2.5 h-2.5 sm:w-3 sm:h-3"
                          />
                          {op}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Otro Software BI */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 sm:p-2.5 border border-blue-100/50">
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-700 mb-1.5">¿Usas otro software BI?</p>
                    <div className="flex gap-1.5 mb-1.5">
                      {["Sí", "No"].map((op) => (
                        <label
                          key={op}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] sm:text-[11px] text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all flex-1 justify-center"
                        >
                          <input
                            type="radio"
                            name="usa_otro_bi"
                            value={op}
                            checked={formData.usa_otro_bi === op}
                            onChange={(e) => {
                              handleChange(e);
                              setTableau(op);
                            }}
                            className="accent-blue-600 w-2.5 h-2.5 sm:w-3 sm:h-3"
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
                          placeholder="¿Cuál software?"
                          className="w-full border border-blue-200 rounded-md px-2 py-1 text-[10px] sm:text-[11px] text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {/* ArcGIS */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 sm:p-2.5 border border-blue-100/50">
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-700 mb-1.5">¿Tienes ArcGIS Online?</p>
                    <div className="flex gap-1.5">
                      {["Sí", "No"].map((op) => (
                        <label
                          key={op}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] sm:text-[11px] text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all flex-1 justify-center"
                        >
                          <input
                            type="radio"
                            name="tiene_arcgis_online"
                            value={op}
                            checked={formData.tiene_arcgis_online === op}
                            onChange={handleChange}
                            className="accent-blue-600 w-2.5 h-2.5 sm:w-3 sm:h-3"
                          />
                          {op}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Nota informativa */}
                  <div className="bg-amber-50/80 border border-amber-200/60 rounded-lg p-1.5 sm:p-2">
                    <p className="text-[8px] sm:text-[9px] text-amber-800 flex items-start gap-1 leading-relaxed">
                      <span className="text-amber-500 mt-0.5 text-[10px]">💡</span>
                      <span>No necesitas tener todas las herramientas. El taller se adapta a tu nivel.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Botones más compactos */}
            <div className="flex gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-1.5 text-[10px] sm:text-[11px] font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition-all disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-1.5 text-[10px] sm:text-[11px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar inscripción"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center gap-2 bg-gradient-to-b from-white to-green-50/30">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">¡Inscripción enviada!</h3>
            <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed max-w-xs">
              Gracias por registrarte al Taller CPCI.<br />
              Recibirás un correo de confirmación pronto.
            </p>
            <button
              onClick={onClose}
              className="mt-1 px-4 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
            >
              Cerrar ventana
            </button>
          </div>
        )}
      </div>
    </div>
  );
}