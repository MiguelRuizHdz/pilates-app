import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pilates Studio | Encuentra tu equilibrio",
  description: "Estudio de Pilates premium enfocado en tu bienestar físico y mental. Únete a nuestras clases de Reformer, Mat y funcionales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} scroll-smooth antialiased`}>
      <body className="font-sans bg-[var(--color-background)] text-primary min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
