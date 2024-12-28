"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useSessionStore from "@/stores/useSessionStore";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const loadSessionFromCookies = useSessionStore(
    (state) => state.loadSessionFromCookies
  );

  useEffect(() => {
    setIsClient(true);
    loadSessionFromCookies();
  }, [loadSessionFromCookies]);

  return (
    <>
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-dancing-script">
          Bienvenidos a Oh&apos;Diosa Nails
        </h1>
        <p className="text-base md:text-lg text-white font-lora">
          Las uñas de una diosa
        </p>
      </header>
      <main className="flex flex-col items-center gap-6 md:gap-8">
        {isClient && (
          <div className="flex justify-center items-center  p-5">
            <Image src="/logo.png" alt="Manicure" width={150} height={150} />
          </div>
        )}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 font-dancing-script">
            ¡Reserva tu cita hoy!
          </h2>
          <p className="text-base md:text-lg text-white mb-6 md:mb-8 font-lora">
            Experimenta los mejores servicios de manicura en la ciudad.
          </p>
          <a
            className="font-bold py-2 px-4 rounded-full shadow-lg bg-purple-600 text-white hover:bg-purple-400 transition-colors w-full"
            href="/book"
          >
            Reservar Ahora
          </a>
        </div>
      </main>
      <footer className="mt-8 md:mt-12 text-center text-white font-lora">
        <p>&copy; 2024 Oh&rsquo;Diosa Nails. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
