// src/templates/bienvenidaTallerEmail.js
export const bienvenidaTallerTemplate = ({
  nombres = "Participante",
  apellidos = "",
  username = "",
  evento = "Taller CPCI: Visualización de datos catastrales con herramientas BI",
  fechaInicio = "21 de septiembre del 2026",
  fechaFin = "25 de septiembre del 2026",
  modalidad = "Virtual",
  urlTaller = "https://taller-cpci.vercel.app/",
  urlTeams = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_OGQwYWJiNjUtMTRmMC00M2U1LTllOTQtOTZiNGRlODI4NzNh%40thread.v2/0?context=%7b%22Tid%22%3a%229c48e088-5e44-4b0d-93a0-eeb2c6127c3d%22%2c%22Oid%22%3a%229c8ac461-e752-45a2-886b-d7fab73589c2%22%7d",
  emailSoporte = "soportecatastroapp@gmail.com",
}) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido al Taller CPCI</title>
    <style>
      @media only screen and (max-width: 680px) {
        .email-container {
          width: 100% !important;
        }
        .email-padding {
          padding: 24px 20px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Arial, sans-serif;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f7fa; padding: 20px 0;">
      <tr>
        <td align="center">
          <!-- Contenedor principal -->
          <table class="email-container" cellpadding="0" cellspacing="0" border="0" width="680" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; max-width: 680px;">
            
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
              <td class="email-padding" style="padding: 40px 50px 30px;">
                <h2 style="color: #1a3a5c; font-size: 22px; margin-top: 0; margin-bottom: 20px;">
                  ¡Hola, ${nombres} ${apellidos || ''}! 👋
                </h2>

                <!-- 🏛️ Contexto institucional -->
                <p style="color:#4a5568;font-size:16px;line-height:1.7;margin-bottom:20px;">
                  Le damos la bienvenida al <strong>Taller de Visualización de Datos para Catastro</strong>, una iniciativa oficial del
                  <strong>Comité Permanente sobre el Catastro en Iberoamérica (CPCI)</strong> en colaboración con la
                  <strong>Secretaría de Gestión y Control Territorial del Distrito de Medellín</strong>.
                </p>

                <p style="color:#4a5568;font-size:16px;line-height:1.7;margin-bottom:20px;">
                  En los próximos días estarás desarrollando nuevas habilidades y conocimientos que 
                  potenciarán tu perfil profesional en el mundo de la visualización de datos catastrales.
                </p>

                <p style="color:#4a5568;font-size:16px;line-height:1.7;margin-bottom:25px;">
                  Este espacio técnico está diseñado para instituciones catastrales, equipos SIG y analistas territoriales,
                  con el objetivo de convertir datos espaciales crudos en tableros y activos de decisión estratégica
                  utilizando Power BI y ArcGIS.
                </p>

                <!-- 🧩 GRID 2x2: Estructura, Requisitos, Fechas, Información del Taller -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0;">
                  <tr>
                    <!-- Columna izquierda: Estructura del programa -->
                    <td width="49%" valign="top" style="background:#f8faff; border:2px solid #dbeafe; border-radius:10px; padding:18px;">
                      <h3 style="margin-top:0; color:#1a3a5c; font-size:14px; margin-bottom: 10px;">
                        🧩 Estructura del programa
                      </h3>
                      <ul style="color:#4a5568; line-height:1.5; font-size:12.5px; margin: 0; padding-left: 16px;">
                        <li style="margin-bottom:6px;"><strong>Taller 1:</strong> Herramientas geográficas del Distrito de Medellín para datos espaciales y catastrales.</li>
                        <li style="margin-bottom:6px;"><strong>Taller 2:</strong> Inteligencia de negocios (BI) con enfoque espacial.</li>
                        <li><strong>Taller 3:</strong> Narrativa espacial e historias de datos (Spatial Storytelling).</li>
                      </ul>
                    </td>

                    <td width="2%">&nbsp;</td>

                    <!-- Columna derecha: Requisitos previos -->
                    <td width="49%" valign="top" style="background:#fff8e1; border-left:5px solid #f59e0b; border-radius:6px; padding:18px;">
                      <h3 style="margin-top:0; color:#7c5700; font-size:14px; margin-bottom: 10px;">
                        💻 Requisitos previos
                      </h3>
                      <p style="margin:0;color:#7c5700;font-size:12.5px;line-height:1.6;">
                        • <a href="https://www.microsoft.com/es-es/download/details.aspx?id=58494" style="color:#7c5700; text-decoration: underline;">Descargar Power BI</a><br>
                        • <a href="https://www.esri.com/es-es/arcgis/products/arcgis-online/trial" style="color:#7c5700; text-decoration: underline;">Descargar ArcGIS Online</a>
                      </p>
                    </td>
                  </tr>

                  <tr><td colspan="3" style="line-height:14px; font-size:14px;">&nbsp;</td></tr>

                  <tr>
                    <!-- Columna izquierda: Fechas y horarios -->
                    <td width="49%" valign="top" style="background: linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%); border: 2px solid #dbeafe; border-radius: 10px; padding: 18px;">
                      <h3 style="margin-top: 0; color: #1a3a5c; font-size: 14px; margin-bottom: 8px;">
                        🕒 Fechas y horarios
                      </h3>
                      <p style="margin:0 0 8px; color:#2d3748; font-size:12.5px;">
                        <strong>Lunes 21, miércoles 23 y viernes 25 de septiembre.</strong>
                      </p>
                      <table cellpadding="2" cellspacing="0" border="0" width="100%" style="font-size: 12px; color: #2d3748;">
                        <tr><td style="font-weight: 600; color: #1a3a5c;">🇲🇽 México:</td><td align="right">07:00-10:00</td></tr>
                        <tr><td style="font-weight: 600; color: #1a3a5c;">🇨🇴 Colombia:</td><td align="right">08:00-11:00</td></tr>
                        <tr><td style="font-weight: 600; color: #1a3a5c;">🇩🇴 R. Dominicana:</td><td align="right">09:00-12:00</td></tr>
                        <tr><td style="font-weight: 600; color: #1a3a5c;">🇦🇷 Argentina:</td><td align="right">10:00-13:00</td></tr>
                        <tr><td style="font-weight: 600; color: #1a3a5c;">🇪🇸 España:</td><td align="right">15:00-18:00</td></tr>
                      </table>
                    </td>

                    <td width="2%">&nbsp;</td>

                    <!-- Columna derecha: Información del Taller -->
                    <td width="49%" valign="top" style="background: linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%); border: 2px solid #dbeafe; border-radius: 10px; padding: 18px;">
                      <h3 style="margin-top: 0; color: #1a3a5c; font-size: 14px; margin-bottom: 8px;">
                        📅 Información del Taller
                      </h3>
                      <table cellpadding="2" cellspacing="0" border="0" width="100%" style="font-size: 12px; color: #2d3748;">
                        <tr>
                          <td style="font-weight: 600; color: #1a3a5c;">📆 Inicio:</td>
                          <td>${fechaInicio}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 600; color: #1a3a5c;">📆 Fin:</td>
                          <td>${fechaFin}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 600; color: #1a3a5c;">💻 Modalidad:</td>
                          <td>${modalidad}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: 600; color: #1a3a5c;">🌐 Plataforma:</td>
                          <td><a href="${urlTaller}" style="color: #2563eb; text-decoration: underline;">taller-cpci.vercel.app</a></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

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

                <!-- 🚀 Botón de acceso a la plataforma -->
                <div style="text-align:center;margin:35px 0;">
                  <p style="color:#4a5568;font-size:15px;margin-bottom: 20px;">
                    <strong>Accede a la plataforma del taller:</strong>
                  </p>
                  <a href="${urlTaller}" style="display:inline-block; background:#2563eb; color:white; text-decoration:none; padding:16px 34px; border-radius:8px; font-size:16px; font-weight:bold;">Ir al Taller Ahora</a>
                </div>

                <!-- 📹 Botón de acceso a Teams -->
                <div style="text-align:center;margin:35px 0;">
                  <p style="color:#4a5568;font-size:15px;margin-bottom: 20px;">
                    <strong>Únete a las sesiones en vivo por Microsoft Teams:</strong>
                  </p>
                  <a href="${urlTeams}" style="display:inline-block; background:#5059c9; color:white; text-decoration:none; padding:16px 34px; border-radius:8px; font-size:16px; font-weight:bold;">📹 Unirme a la reunión en Teams</a>
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
          <table cellpadding="0" cellspacing="0" border="0" width="680" class="email-container" style="margin-top: 15px; max-width: 680px;">
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