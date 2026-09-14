// src/templates/bienvenidaTallerEmail.js
export const bienvenidaTallerTemplate = ({
  nombres = "Participante",
  apellidos = "",
  username = "",
  evento = "Taller CPCI: Visualización Avanzada con herramientas BI",
  fechaInicio = "21 de septiembre del 2026",
  fechaFin = "25 de septiembre del 2026",
  modalidad = "Virtual",
  urlTaller = "https://taller-cpci.vercel.app/",
  emailSoporte = "soportecatastroapp@gmail.com",
}) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido al Taller CPCI</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Arial, sans-serif;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f7fa; padding: 20px 0;">
      <tr>
        <td align="center">
          <!-- Contenedor principal -->
          <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
            
            <!-- HEADER con logos -->
            <tr>
              <td style="background: linear-gradient(135deg, #1a3a5c 0%, #2a5f8a 100%); padding: 30px 40px; text-align: center;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 15px;">
                      <img src="cid:logo_principal" alt="Logo CPCI" width="80" style="display: inline-block; margin: 0 10px;">
                      <img src="cid:logo_secundario" alt="Logo Institución" width="80" style="display: inline-block; margin: 0 10px;">
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px;">
                        ¡BIENVENIDO AL TALLER!
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CUERPO del correo -->
            <tr>
              <td style="padding: 40px 40px 30px;">
                <h2 style="color: #1a3a5c; font-size: 22px; margin-top: 0; margin-bottom: 20px;">
                  ¡Hola, ${nombres} ${apellidos || ''}! 👋
                </h2>

                <p style="color:#4a5568;font-size:16px;line-height:1.7;margin-bottom:20px;">
                  Es un placer darte la bienvenida al
                  <strong>${evento}</strong>.
                  Estamos muy emocionados de que formes parte de esta experiencia de aprendizaje.
                </p>

                <p style="color:#4a5568;font-size:16px;line-height:1.7;margin-bottom:25px;">
                  En los próximos días estarás desarrollando nuevas habilidades y conocimientos que 
                  potenciarán tu perfil profesional en el mundo de la visualización de datos catastrales.
                </p>

                <!-- 📅 Información del Taller -->
                <div style="background: linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%); border: 2px solid #dbeafe; border-radius: 10px; padding: 20px 25px; margin: 25px 0;">
                  <h3 style="margin-top: 0; color: #1a3a5c; font-size: 16px; margin-bottom: 15px;">
                    📅 Información del Taller
                  </h3>
                  <table cellpadding="6" cellspacing="0" border="0" width="100%" style="font-size: 15px; color: #2d3748;">
                    <tr>
                      <td style="font-weight: 600; color: #1a3a5c; width: 40%;">📆 Fecha de inicio:</td>
                      <td>${fechaInicio}</td>
                    </tr>
                    <tr>
                      <td style="font-weight: 600; color: #1a3a5c;">📆 Fecha de finalización:</td>
                      <td>${fechaFin}</td>
                    </tr>
                    <tr>
                      <td style="font-weight: 600; color: #1a3a5c;">💻 Modalidad:</td>
                      <td>${modalidad}</td>
                    </tr>
                    <tr>
                      <td style="font-weight: 600; color: #1a3a5c;">🌐 Plataforma:</td>
                      <td>
                        <a href="${urlTaller}" style="color: #2563eb; text-decoration: underline;">
                          taller-cpci.vercel.app
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- 🎯 Objetivos del Taller -->
                <div style="background:#f8faff; border:2px solid #dbeafe; border-radius:10px; padding:24px; margin:30px 0;">
                  <h3 style="margin-top:0; color:#1a3a5c; font-size:18px; margin-bottom: 15px;">
                    🎯 ¿Qué vas a aprender?
                  </h3>
                  <ul style="color:#4a5568; line-height:1.8; font-size:15px; margin: 0; padding-left: 20px;">
                    <li>Transformar datos crudos de bases espaciales en información estratégica.</li>
                    <li>Conectar Power BI a bases de datos espaciales (PostGIS) y ejecutar procesos ETL.</li>
                    <li>Diseñar visualizaciones espaciales con ArcGIS y mapas coropléticos.</li>
                    <li>Presentar tableros a tomadores de decisión.</li>
                    <li>Crear historias de datos espaciales (Spatial Storytelling).</li>
                  </ul>
                </div>

                <!-- 🚀 Botón de acceso -->
                <div style="text-align:center;margin:35px 0;">
                  <p style="color:#4a5568;font-size:15px;margin-bottom: 20px;">
                    <strong>Accede a la plataforma del taller:</strong>
                  </p>
                  <a
                    href="${urlTaller}"
                    style="display:inline-block; background:#2563eb; color:white; text-decoration:none; padding:16px 34px; border-radius:8px; font-size:16px; font-weight:bold;"
                  >
                    Ir al Taller Ahora
                  </a>
                </div>

                <!-- 📋 Recomendaciones previas -->
                <div style="background:#fff8e1; border-left:5px solid #f59e0b; padding:18px; border-radius:6px; margin: 25px 0;">
                  <p style="margin:0;color:#7c5700;font-size:14px;line-height:1.7;">
                    <strong>📝 Antes de comenzar, ten en cuenta:</strong><br><br>
                    • Verifica que tu conexión a internet sea estable.<br>
                    • Ten a mano tus credenciales de acceso.<br>
                    • Revisa el material previo disponible en la plataforma.<br>
                    • Si tienes alguna duda, contacta al equipo de soporte.
                  </p>
                </div>

                <!-- 💬 Espacio de contacto -->
                <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                  <p style="margin: 0; color: #1a3a5c; font-size: 14px; line-height: 1.6;">
                    ⚡ <strong>¿Tienes preguntas?</strong><br>
                    Contáctanos en 
                    <a href="mailto:${emailSoporte}" style="color: #2a5f8a; text-decoration: underline;">
                      ${emailSoporte}
                    </a>
                  </p>
                </div>

                <!-- 🌟 Mensaje de cierre -->
                <div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-radius: 10px; padding: 20px 25px; margin: 25px 0; text-align: center;">
                  <p style="margin: 0; color: #1b5e20; font-size: 15px; line-height: 1.6; font-weight: 500;">
                    🚀 <strong>¡Estamos seguros de que será una experiencia increíble!</strong><br>
                    <span style="font-size: 14px;">Tu compromiso y dedicación harán la diferencia.</span>
                  </p>
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #f8fafc; padding: 25px 40px; border-top: 1px solid #e2e8f0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 5px; color: #4a5568; font-size: 14px; font-weight: 600;">
                        CPCI - Comité Permanente sobre el Catastro en Iberoamérica
                      </p>
                      <p style="margin: 0 0 10px; color: #718096; font-size: 13px;">
                        ✉ ${emailSoporte} | 🌐 <a href="${urlTaller}" style="color: #718096; text-decoration: underline;">${urlTaller}</a>
                      </p>
                      <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                        Este es un mensaje automático, por favor no responder a este correo.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
          <!-- Fin contenedor principal -->

          <!-- Aviso de confidencialidad -->
          <table cellpadding="0" cellspacing="0" border="0" width="600" style="margin-top: 15px;">
            <tr>
              <td align="center">
                <p style="color: #a0aec0; font-size: 11px; line-height: 1.4; margin: 0;">
                  Este correo electrónico contiene información confidencial y está dirigido únicamente al destinatario.
                  Si ha recibido este mensaje por error, por favor elimínelo y notifique al remitente.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;