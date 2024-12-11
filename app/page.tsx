"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-700 dark:via-purple-700 dark:to-indigo-700 p-4 md:p-8">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Bienvenidos a Oh&apos;Diosa Nails
        </h1>
        <p className="text-base md:text-lg text-white">
          Tu destino local para unas uñas hermosas
        </p>
      </header>
      <main className="flex flex-col items-center gap-6 md:gap-8">
        {isClient && (
          <div className="flex justify-center items-center w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg">
            <Image
              className="object-cover"
              src="/main.avif"
              alt="Manicure"
              width={300}
              height={300}
              priority
            />
          </div>
        )}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            ¡Reserva tu cita hoy!
          </h2>
          <p className="text-base md:text-lg text-white mb-6 md:mb-8">
            Experimenta los mejores servicios de manicura en la ciudad.
          </p>
          <a
            className="bg-white dark:bg-gray-800 text-pink-500 dark:text-pink-300 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-500 dark:hover:bg-pink-300 hover:text-white dark:hover:text-gray-800 transition-colors"
            href="/book"
          >
            Reservar Ahora
          </a>
        </div>
      </main>
      <footer className="mt-8 md:mt-12 text-center text-white">
        <p>&copy; 2023 Oh&rsquo;Diosa Nails. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
