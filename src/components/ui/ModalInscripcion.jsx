'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from 'next/link';

export default function ModalInscripcion({ isOpen, onClose }) {
  const [tableau, setTableau] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

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

  const hasFormData = () => {
    const { confirmPassword, ...rest } = formData;
    return Object.values(rest).some(value => value && value.trim() !== '');
  };

  const handleClose = () => {
    if (hasFormData() && !enviado) {
      setShowConfirmClose(true);
    } else {
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
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
    setTableau('');
    setAceptaTerminos(false);
    setEnviado(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, formData, enviado]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aceptaTerminos) {
      alert("Debes aceptar la Política de Tratamiento de Datos Personales para continuar.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("La contraseña debe tener mínimo 8 caracteres, una letra y un número.");
      return;
    }

    const { confirmPassword, ...rest } = formData;
    const dataToSend = {
      ...rest,
      tiene_power_bi: formData.tiene_power_bi === "Sí",
      usa_otro_bi: formData.usa_otro_bi === "Sí",
      tiene_arcgis_online: formData.tiene_arcgis_online === "Sí",
      acepta_terminos: aceptaTerminos,
    };

    try {
      setLoading(true);
      const response = await fetch("/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al registrar inscripción");
      }

      setEnviado(true);
      setShowConfirmClose(false);
      // No resetear el formulario aquí, se resetea al cerrar
    } catch (error) {
      console.error(error);
      alert(error.message || "No fue posible completar la inscripción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal principal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-3 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
        <div 
          className="bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200/60 shadow-2xl w-full max-w-[95vw] sm:max-w-2xl lg:max-w-3xl max-h-[94vh] flex flex-col overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Header - FIJO */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-800 to-blue-400 flex-shrink-0">
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
              onClick={handleClose}
              className="text-blue-200 hover:text-white transition-colors rounded-lg hover:bg-white/10 p-1 group"
              aria-label="Cerrar"
              title="Cerrar"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* CONTENIDO: Si está enviado muestra el mensaje de éxito, si no el formulario */}
          {enviado ? (
            /* SECCIÓN DE ÉXITO - RESTAURADA Y MEJORADA */
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 text-center bg-gradient-to-b from-white via-green-50/30 to-emerald-50/20">
              <div className="relative">
                {/* Círculo decorativo */}
                <div className="absolute inset-0 bg-green-400/10 rounded-full blur-2xl scale-150"></div>
                
                {/* Icono de éxito */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 mb-6 animate-in zoom-in duration-500">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 animate-in slide-in-from-bottom-4 duration-300">
                ¡Inscripción exitosa! 🎉
              </h3>
              
              <div className="max-w-sm space-y-3 animate-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Gracias por registrarte al <span className="font-semibold text-blue-600">Taller CPCI</span>.
                </p>
                <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl p-4 text-left">
                  <p className="text-xs sm:text-sm text-slate-700">
                    <span className="font-semibold text-blue-700">📧 Próximo paso:</span>
                    <br />
                    Hemos enviado un correo de confirmación a <span className="font-medium text-blue-600 break-all">{formData.correo_electronico}</span>.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Revisa tu bandeja de entrada (y la carpeta de spam) para activar tu cuenta y acceder a la plataforma.
                  </p>
                </div>
                <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3">
                  <p className="text-xs text-amber-700 flex items-start gap-2">
                    <span className="text-amber-500 text-base">💡</span>
                    <span>Si no recibes el correo en los próximos minutos, verifica tu bandeja de spam o contacta al soporte.</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              >
                Cerrar ventana
              </button>
            </div>
          ) : (
            /* FORMULARIO - El código existente del formulario */
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              {/* Contenido con Scroll Independiente */}
              <div className="flex-1 overflow-y-auto p-2.5 sm:p-3.5 space-y-2.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                  
                  {/* Columna Izquierda */}
                  <div className="space-y-2 bg-gradient-to-b from-white to-slate-50/30 pr-0 md:pr-2.5">
                    
                    {/* Datos Personales */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-2 bg-blue-500 rounded-full"></div>
                        <h3 className="text-[9px] sm:text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Datos Personales</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        <div className="flex flex-col gap-0.5">
                          <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Nombres *</label>
                          <input
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            required
                            placeholder="María"
                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
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
                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
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
                          placeholder="correo@gmail.com"
                          className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Teléfono</label>
                        <PhoneInput
                          country="co"
                          enableSearch
                          searchPlaceholder="Buscar país..."
                          value={formData.telefono}
                          onChange={(phone) => setFormData((prev) => ({ ...prev, telefono: phone }))}
                          containerStyle={{ width: "100%" }}
                          inputStyle={{
                            width: "100%",
                            height: "32px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            paddingLeft: "45px",
                            fontSize: "11px",
                          }}
                          buttonStyle={{
                            borderTopLeftRadius: "8px",
                            borderBottomLeftRadius: "8px",
                            border: "1px solid #cbd5e1",
                            backgroundColor: "#fff",
                            height: "32px"
                          }}
                        />
                      </div>
                    </div>

                    {/* Credenciales */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-2 bg-indigo-500 rounded-full"></div>
                        <h3 className="text-[9px] sm:text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Credenciales</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
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
                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
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
                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Información Profesional */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-2 bg-emerald-500 rounded-full"></div>
                        <h3 className="text-[9px] sm:text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Profesional</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        <div className="flex flex-col gap-0.5">
                          <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">Cargo *</label>
                          <input
                            type="text"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            required
                            placeholder="Analista GIS"
                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <label className="text-[9px] sm:text-[10px] font-medium text-slate-500">País *</label>
                          <select
                            name="pais"
                            value={formData.pais}
                            onChange={handleChange}
                            required
                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
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
                          className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha: Herramientas Técnicas */}
                  <div className="space-y-2.5 pt-2 md:pt-0 pl-0 md:pl-2.5 bg-gradient-to-b from-slate-50/50 to-white flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-2 bg-purple-500 rounded-full"></div>
                        <h3 className="text-[9px] sm:text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Herramientas</h3>
                      </div>

                      {/* Power BI */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-1.5 border border-blue-100/50">
                        <p className="text-[10px] font-medium text-slate-700 mb-1">¿Cuentas con Power BI?</p>
                        <div className="flex gap-1.5">
                          {["Sí", "No"].map((op) => (
                            <label key={op} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 cursor-pointer hover:border-blue-300 flex-1 justify-center">
                              <input
                                type="radio"
                                name="tiene_power_bi"
                                value={op}
                                checked={formData.tiene_power_bi === op}
                                onChange={handleChange}
                                className="accent-blue-600 w-3 h-3"
                              />
                              {op}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Otro Software BI */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-1.5 border border-blue-100/50">
                        <p className="text-[10px] font-medium text-slate-700 mb-1">¿Usas otro software BI?</p>
                        <div className="flex gap-1.5 mb-1">
                          {["Sí", "No"].map((op) => (
                            <label key={op} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 cursor-pointer hover:border-blue-300 flex-1 justify-center">
                              <input
                                type="radio"
                                name="usa_otro_bi"
                                value={op}
                                checked={formData.usa_otro_bi === op}
                                onChange={(e) => {
                                  handleChange(e);
                                  setTableau(op);
                                }}
                                className="accent-blue-600 w-3 h-3"
                              />
                              {op}
                            </label>
                          ))}
                        </div>
                        {tableau === "Sí" && (
                          <input
                            type="text"
                            name="otro_bi_nombre"
                            value={formData.otro_bi_nombre}
                            onChange={handleChange}
                            placeholder="¿Cuál software?"
                            className="w-full border border-blue-200 rounded-md px-2 py-1 text-[10px] text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                        )}
                      </div>

                      {/* ArcGIS */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-1.5 border border-blue-100/50">
                        <p className="text-[10px] font-medium text-slate-700 mb-1">¿Tienes ArcGIS Online?</p>
                        <div className="flex gap-1.5">
                          {["Sí", "No"].map((op) => (
                            <label key={op} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 cursor-pointer hover:border-blue-300 flex-1 justify-center">
                              <input
                                type="radio"
                                name="tiene_arcgis_online"
                                value={op}
                                checked={formData.tiene_arcgis_online === op}
                                onChange={handleChange}
                                className="accent-blue-600 w-3 h-3"
                              />
                              {op}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Nota informativa */}
                      <div className="bg-amber-50/80 border border-amber-200/60 rounded-lg p-1.5">
                        <p className="text-[8px] sm:text-[9px] text-amber-800 flex items-start gap-1 leading-relaxed">
                          <span className="text-amber-500 mt-0.5">💡</span>
                          <span>No necesitas tener todas las herramientas. El taller se adapta a tu nivel.</span>
                        </p>
                      </div>
                    </div>

                    {/* LOGO 2022 */}
                    <div className="flex justify-center py-4">
                        <div className="w-full flex justify-center items-center bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-xl p-4 border border-blue-100/60 shadow-sm">
                            <Image
                                src="/Img/logo_2022.png"
                                alt="Logo 2022"
                                width={700}
                                height={350}
                                className="w-[90%] h-auto object-contain"
                            />
                        </div>
                    </div>
                  </div>
                </div>

                {/* TÉRMINOS Y CONDICIONES */}
                <div className="pt-1.5 border-t border-slate-200/60">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="aceptaTerminos"
                        checked={aceptaTerminos}
                        onChange={(e) => setAceptaTerminos(e.target.checked)}
                        className="mt-0.5 w-3.5 h-3.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer flex-shrink-0"
                        required
                      />
                      <label htmlFor="aceptaTerminos" className="text-[9px] sm:text-[10px] text-slate-600 leading-relaxed">
                        Acepto la{' '}
                        <Link href="/tratamiento-datos" target="_blank" className="text-blue-600 hover:text-blue-800 underline font-medium">
                          Política de Tratamiento de Datos Personales
                        </Link>{' '}
                        y autorizo el tratamiento de mis datos de acuerdo con la Ley 1581 de 2012.
                      </label>
                    </div>
                    <div className="flex items-center gap-2 pl-5">
                      <span className="text-[8px] sm:text-[9px] text-slate-400">🔒 Tus datos están protegidos</span>
                      <span className="w-px h-3 bg-slate-300"></span>
                      <a href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981" target="_blank" rel="noopener noreferrer" className="text-[8px] sm:text-[9px] text-slate-400 hover:text-blue-600 inline-flex items-center gap-0.5">
                        Consultar Ley 1581 de 2012
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer - Botones */}
              <div className="flex gap-2 px-3 py-2 bg-slate-50 border-t border-slate-200 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 py-1.5 text-[10px] sm:text-[11px] font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition-all disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-1.5 text-[10px] sm:text-[11px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
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
          )}
        </div>
      </div>

      {/* Modal de confirmación para cerrar */}
      {showConfirmClose && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">¿Seguro que quieres salir?</h3>
              <p className="text-sm text-slate-600 mb-6">
                Tienes información en el formulario que se perderá si sales.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowConfirmClose(false);
                    onClose();
                    resetForm();
                  }}
                  className="flex-1 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                >
                  Sí, salir
                </button>
                <button
                  onClick={() => setShowConfirmClose(false)}
                  className="flex-1 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Seguir llenando
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}