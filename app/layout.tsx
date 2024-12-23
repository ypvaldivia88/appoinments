import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNavigation from "./components/TopNavigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopNavigation />
        <div
          className="relative flex flex-col items-center justify-center min-h-screen  p-4 md:p-8 text-gray-300"
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
