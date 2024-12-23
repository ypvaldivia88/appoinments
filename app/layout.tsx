import type { Metadata } from "next";
import { Dancing_Script, Lora } from "next/font/google";
import "./globals.css";
import TopNavigation from "./components/TopNavigation";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "700"],
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "700"],
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
        className={`${dancingScript.variable} ${lora.variable} antialiased`}
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
