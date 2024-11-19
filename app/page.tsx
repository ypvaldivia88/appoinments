import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Bienvenidos a Oh&apos;Diosa Nails
        </h1>
        <p className="text-lg text-white">
          Tu destino local para unas uñas hermosas
        </p>
      </header>
      <main className="flex flex-col items-center gap-8">
        <div className="flex justify-center items-center w-72 h-72 rounded-full overflow-hidden shadow-lg">
          <Image
            className="object-cover"
            src="/main.avif"
            alt="Manicure"
            width={300}
            height={300}
            priority
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            ¡Reserva tu cita hoy!
          </h2>
          <p className="text-lg text-white mb-8">
            Experimenta los mejores servicios de manicura en la ciudad.
          </p>
          <a
            className="bg-white text-pink-500 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-colors"
            href="/book"
          >
            Reservar Ahora
          </a>
        </div>
      </main>
      <footer className="mt-12 text-center text-white">
        <p>&copy; 2023 Oh&rsquo;Diosa Nails. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
