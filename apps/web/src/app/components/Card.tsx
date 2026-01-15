import Link from "next/link";
import Image from "next/image";

type Actor = {
  id: string;
  name: string;
};

type CardProps = {
  id: string;
  title: string;
  photoUrl: string;
  actors: Actor[];
};

export default function Card({ id, title, photoUrl, actors }: CardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Contenedor de Imagen */}
      <Link href={`/video/${encodeURIComponent(id)}`} className="block overflow-hidden aspect-video relative">
        <Image
          src={photoUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </Link>

      {/* Contenido */}
      <div className="p-4">
        <Link href={`/video/${encodeURIComponent(id)}`}>
          <h3 className="font-bold text-gray-800 dark:text-gray-100 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Lista de Actores */}
        <div className="mt-4 flex flex-wrap gap-2">
          {actors.map((actor) => (
            <Link
              key={actor.id}
              href={`/actors/${encodeURIComponent(actor.id)}`}
              className="inline-flex items-center bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1 rounded-md text-xs font-medium transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
            >
              {actor.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}