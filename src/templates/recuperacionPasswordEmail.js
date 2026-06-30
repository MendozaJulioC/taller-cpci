export const recuperacionPasswordTemplate = ({
  nombres,
  apellidos,
  token,
  fechaSolicitud = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Contraseña - CPCI</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%); font-family: 'Inter', 'Segoe UI', Arial, sans-serif;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%); padding: 40px 0;">
      <tr>
        <td align="center">
          <!-- Contenedor principal -->
          <table cellpadding="0" cellspacing="0" border="0" width="620" style="background-color: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.12); overflow: hidden; margin: 0 auto;">
            
            <!-- HEADER - ULTRA COMPACTO -->
            <tr>
              <td style="background: linear-gradient(135deg, #0f2b4a 0%, #1a4a7a 50%, #2a6ba0 100%); padding: 12px 40px 10px; text-align: center; position: relative;">
                <!-- Decoraciones mínimas -->
                <div style="position: absolute; top: -30px; right: -30px; width: 80px; height: 80px; background: rgba(255,255,255,0.03); border-radius: 50%;"></div>
                
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 4px;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding: 0 6px;">
                            <img src="cid:logo_principal" alt="Logo CPCI" width="45" style="display: inline-block; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
                          </td>
                          <td style="padding: 0 6px;">
                            <div style="width: 1px; height: 30px; background: rgba(255,255,255,0.15);"></div>
                          </td>
                          <td style="padding: 0 6px;">
                            <img src="cid:logo_secundario" alt="Logo Institución" width="45" style="display: inline-block; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <span style="color: #a8c8e8; font-size: 9px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; background: rgba(255,255,255,0.08); padding: 2px 12px; border-radius: 20px; display: inline-block;">🔐 Seguridad</span>
                      <h1 style="color: #ffffff; margin: 3px 0 0 0; font-size: 17px; font-weight: 700; letter-spacing: -0.3px; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        Recuperación de Contraseña
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- BADGE de estado -->
            <tr>
              <td style="padding: 0 40px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: -10px;">
                  <tr>
                    <td align="center">
                      <div style="background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 6px 16px; display: inline-block; border: 1px solid #e8edf2;">
                        <span style="color: #f59e0b; font-size: 11px; font-weight: 600;">
                          ⏳ Solicitud pendiente
                        </span>
                        <span style="color: #94a3b8; font-size: 11px; margin-left: 8px; padding-left: 8px; border-left: 1px solid #e2e8f0;">
                          ${fechaSolicitud}
                        </span>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CUERPO del correo -->
            <tr>
              <td style="padding: 25px 40px 20px;">
                <!-- Saludo personalizado -->
                <div style="margin-bottom: 16px;">
                  <h2 style="color: #0f2b4a; font-size: 20px; font-weight: 700; margin: 0 0 2px 0; letter-spacing: -0.5px;">
                    Hola, ${nombres} ${apellidos || ''} 👋
                  </h2>
                  <p style="color: #64748b; font-size: 13px; margin: 0; font-weight: 400;">
                    Recibimos tu solicitud para restablecer la contraseña
                  </p>
                </div>

                <p style="color: #334155; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                  Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en el 
                  <strong style="color: #1a4a7a;">Taller CPCI: Visualización Avanzada con herramientas BI</strong>.
                </p>

                <!-- Instrucciones en card -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; border: 1px solid #e2e8f0; margin: 16px 0; padding: 0;">
                  <tr>
                    <td style="padding: 16px 20px;">
                      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #1a4a7a, #2a6ba0); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">📝</div>
                        <div>
                          <h3 style="margin: 0; color: #0f2b4a; font-size: 14px; font-weight: 600;">Instrucciones</h3>
                          <p style="margin: 1px 0 0; color: #64748b; font-size: 12px;">Sigue estos pasos para crear una nueva contraseña</p>
                        </div>
                      </div>
                      <ol style="color: #334155; font-size: 13px; line-height: 1.8; padding-left: 18px; margin: 0;">
                        <li>Haz clic en el botón <strong>"Restablecer contraseña"</strong></li>
                        <li>Serás redirigido a una página segura de CPCI</li>
                        <li>Ingresa tu nueva contraseña (mínimo 6 caracteres)</li>
                        <li>Confirma tu nueva contraseña y listo ✅</li>
                      </ol>
                    </td>
                  </tr>
                </table>

                <!-- Botón principal -->
                <div style="text-align: center; margin: 24px 0 20px;">
                  <table cellpadding="0" cellspacing="0" border="0" align="center">
                    <tr>
                      <td style="background: linear-gradient(135deg, #1a4a7a 0%, #2a6ba0 100%); border-radius: 10px; padding: 0; box-shadow: 0 4px 16px rgba(26, 74, 122, 0.25);">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/reset-password?token=${token}" 
                           style="display: inline-block; padding: 12px 36px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; letter-spacing: 0.3px; border-radius: 10px;">
                          🔑 Restablecer contraseña
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="color: #94a3b8; font-size: 11px; margin-top: 8px; font-weight: 400;">
                    ⏱️ Este enlace expirará en <strong style="color: #ef4444;">1 hora</strong>
                  </p>
                </div>

                <!-- Enlace alternativo -->
                <div style="background: #fefce8; border-radius: 8px; border: 1px solid #fde68a; padding: 12px 16px; margin: 16px 0 14px;">
                  <p style="margin: 0 0 3px 0; color: #92400e; font-size: 11px; font-weight: 500;">
                    💡 ¿Problemas con el botón? Copia este enlace:
                  </p>
                  <p style="margin: 0; color: #1a4a7a; font-size: 11px; word-break: break-all; background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid #fde68a;">
                    <span style="font-family: 'Courier New', monospace; font-size: 10px; color: #0f2b4a;">
                      ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/reset-password?token=${token}
                    </span>
                  </p>
                </div>

                <!-- Mensaje de seguridad -->
                <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 8px; padding: 12px 16px; margin: 14px 0; border: 1px solid #93c5fd;">
                  <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <span style="font-size: 16px; flex-shrink: 0;">🛡️</span>
                    <div>
                      <p style="margin: 0 0 1px 0; color: #1e3a8a; font-weight: 600; font-size: 12px;">
                        ¿No solicitaste este cambio?
                      </p>
                      <p style="margin: 0; color: #1e40af; font-size: 12px; line-height: 1.4;">
                        Ignora este correo, tu cuenta permanece segura.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Despedida -->
                <div style="margin: 20px 0 6px; padding-top: 14px; border-top: 2px solid #f1f5f9;">
                  <p style="color: #334155; font-size: 13px; line-height: 1.5; margin: 0 0 2px 0;">
                    ¿Necesitas ayuda? Estamos aquí para ti.
                  </p>
                  <p style="color: #64748b; font-size: 12px; margin: 0;">
                    El equipo de <strong style="color: #1a4a7a;">CPCI</strong> 💙
                  </p>
                </div>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 16px 40px; border-top: 1px solid #e2e8f0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 6px;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding: 0 5px;">
                            <a href="#" style="color: #64748b; text-decoration: none; font-size: 11px;">🌐 Website</a>
                          </td>
                          <td style="padding: 0 5px;">
                            <span style="color: #cbd5e1;">|</span>
                          </td>
                          <td style="padding: 0 5px;">
                            <a href="#" style="color: #64748b; text-decoration: none; font-size: 11px;">📧 contacto@cpci.org</a>
                          </td>
                          <td style="padding: 0 5px;">
                            <span style="color: #cbd5e1;">|</span>
                          </td>
                          <td style="padding: 0 5px;">
                            <a href="#" style="color: #64748b; text-decoration: none; font-size: 11px;">📱 +57 300 123 4567</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 2px 0; color: #94a3b8; font-size: 11px; font-weight: 500;">
                        CPCI - Centro de Capacitación en Productividad e Innovación
                      </p>
                      <p style="margin: 0; color: #b9c7d9; font-size: 9px;">
                        © ${new Date().getFullYear()} - Mensaje automático, no responder
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
          <!-- Fin contenedor principal -->

          <!-- Aviso de confidencialidad -->
          <table cellpadding="0" cellspacing="0" border="0" width="620" style="margin-top: 12px;">
            <tr>
              <td align="center">
                <div style="background: rgba(255,255,255,0.4); border-radius: 8px; padding: 8px 14px;">
                  <p style="color: #8da4c0; font-size: 9px; line-height: 1.3; margin: 0;">
                    🔒 Confidencial - Solo para el destinatario
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;