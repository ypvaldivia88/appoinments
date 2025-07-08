import type { Metadata } from "next";
import "./globals.css";
import TopNavigation from "@/components/TopNavigation";

export const metadata: Metadata = {
  title: "Oh'Diosa Nails",
  description: "Las uñas de una diosa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <TopNavigation />
        <div
          className="relative flex flex-col items-center justify-center p-4 md:p-8 text-gray-300 min-h-screen"
          style={{
            backgroundImage: "url(/main.avif)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-main opacity-75"></div>
          <div className="relative z-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
