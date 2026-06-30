export const inscripcionTemplate = ({
  nombres,
  apellidos,
  username,
  evento = "Taller CPCI: Visualización Avanzada con herramientas BI",
  fechaRegistro = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
}) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Inscripción - CPCI</title>
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
                        CONFIRMACIÓN DE INSCRIPCIÓN
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
                  ¡Inscripción exitosa, ${nombres} ${apellidos || ''}!
                </h2>

                <p style="color:#4a5568;font-size:16px;line-height:1.7;margin-bottom:20px;">
                  Nos complace informarle que su inscripción al
                  <strong>${evento}</strong>
                  ha sido registrada correctamente.
                </p>

                <p style="color:#4a5568;font-size:16px;line-height:1.7;">
                  Desde este momento ya dispone de una cuenta para acceder a la
                  plataforma de formación del CPCI.
                </p>

                <div style="background-color: #f8faff; border-left: 4px solid #2a5f8a; padding: 20px 25px; margin: 25px 0; border-radius: 4px;">
                  <p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.5;">
                    <strong style="color: #1a3a5c;">📅 Fecha de registro:</strong> ${fechaRegistro}<br>
                    <strong style="color: #1a3a5c;">📌 Estado:</strong> <span style="color: #38a169;">Confirmado</span>
                  </p>
                </div>

                <div
                  style="
                    background:#f8faff;
                    border:2px solid #dbeafe;
                    border-radius:10px;
                    padding:24px;
                    margin:30px 0;
                  "
                >

                  <h3
                    style="
                      margin-top:0;
                      color:#1a3a5c;
                      font-size:18px;
                    "
                  >
                    Datos de acceso a la plataforma
                  </h3>

                  <p style="margin:10px 0;font-size:15px;color:#2d3748;">
                    <strong>Usuario:</strong>
                    <span
                      style="
                        background:#eaf2ff;
                        padding:6px 10px;
                        border-radius:6px;
                        font-family:monospace;
                        font-size:16px;
                      "
                    >
                      ${username}
                    </span>
                  </p>

                  <p style="margin:15px 0;color:#2d3748;">
                    <strong>Contraseña:</strong>
                    Es la misma contraseña que registró durante su inscripción.
                  </p>

                </div>

                <div style="text-align:center;margin:35px 0;">
                  <a
                    href="https://taller-cpci.vercel.app/"
                    style="
                      display:inline-block;
                      background:#2563eb;
                      color:white;
                      text-decoration:none;
                      padding:16px 34px;
                      border-radius:8px;
                      font-size:16px;
                      font-weight:bold;
                    "
                  >
                    Ingresar a la plataforma
                  </a>
                </div>

                <p style="color:#4a5568;font-size:16px;line-height:1.7;">
                  Al ingresar a la plataforma podrá:
                  </p>

                  <ul
                    style="
                      color:#4a5568;
                      line-height:1.8;
                      font-size:15px;
                    "
                  >
                    <li>Acceder a los talleres disponibles.</li>
                    <li>Consultar el material de estudio.</li>
                    <li>Descargar recursos complementarios.</li>
                    <li>Visualizar los videos y ejercicios prácticos.</li>
                    <li>Realizar las actividades propuestas durante el taller.</li>
                  </ul>

                <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                  <p style="margin: 0; color: #1a3a5c; font-size: 14px;">
                    ⚡ <strong>¿Tienes preguntas?</strong> Contáctanos en 
                    <a href="mailto:equipocatastroapp@gmail.com" style="color: #2a5f8a; text-decoration: underline;">
                      https://taller-cpci.vercel.app/
                    </a>
                  </p>
                </div>
              </td>
            </tr>

            <div
              style="
                background:#fff8e1;
                border-left:5px solid #f59e0b;
                padding:18px;
                border-radius:6px;
                margin-top:30px;
              "
            >

            <p style="margin:0;color:#7c5700;font-size:14px;line-height:1.7;">
            <strong>Recomendación de seguridad:</strong><br><br>

            Conserve este correo, ya que contiene su nombre de usuario de acceso.
            Por motivos de seguridad, la contraseña no se envía por correo electrónico.
            Utilice la misma contraseña que registró durante el proceso de inscripción.
            </p>

            </div>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #f8fafc; padding: 25px 40px; border-top: 1px solid #e2e8f0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 5px; color: #4a5568; font-size: 14px; font-weight: 600;">
                        CPCI - Centro de Capacitación en Productividad e Innovación
                      </p>
                      <p style="margin: 0 0 10px; color: #718096; font-size: 13px;">
                        ✉ equipocatastroapp@gmail.com | 🌐 https://taller-cpci.vercel.app/
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