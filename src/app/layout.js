import "./globals.css";

export const metadata = {
  title: "Taller CPCI",
  description:
    "Comité Permanente sobre el Catastro en Iberoamérica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}