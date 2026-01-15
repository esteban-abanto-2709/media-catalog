// videos.types.ts no contiene clases tipo DTO.

export class VideoResponseDto {
  id: string;
  title: string;
  // Prisma usa 'null' para campos opcionales, por eso usamos '| null'
  description: string | null;
  filename: string;
  path: string;
  size: number;
  duration: number | null;
  width: number | null;
  height: number | null;
  providerUrl: string | null;
  createdAt: Date | null;
  uploadedAt: Date;
  updatedAt: Date;

  // Relaciones implícitas: ahora los objetos vienen directos en el array,
  // ya no hay un objeto intermedio "{ tag: { ... } }"
  tags: TagDto[];
  producers: ProducerDto[];
  actors: ActorDto[];
}

// Definimos sub-DTOs para mantener el tipado fuerte y limpio
export class TagDto {
  id: string;
  name: string;
  slug: string;
}

export class ProducerDto {
  id: string;
  name: string;
  slug: string;
}

export class ActorDto {
  id: string;
  name: string;
  slug: string;
}
