import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Taller CPCI",
  description:
    "Comité Permanente sobre el Catastro en Iberoamérica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen">
        <Header />
        
        {/* El flex-grow asegura que el contenido empuje el footer hacia el fondo si la página es corta */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}