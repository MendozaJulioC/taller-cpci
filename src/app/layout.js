import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/contexts/Providers";

export const metadata = {
  title: "Taller CPCI",
  description:
    "Comité Permanente sobre el Catastro en Iberoamérica",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen">

        <Providers>

          <Header />

          <main className="flex-grow">
            {children}
          </main>

          <Footer />

        </Providers>

      </body>
    </html>
  );
}