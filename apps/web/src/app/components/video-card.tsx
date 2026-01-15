import Link from "next/link";
import { formatSize, formatDate } from "@/lib/utils/formatters";

type VideoCardProps = {
  id: string;
  title: string;
  size: number;
  updatedAt: string;
};

export default function VideoCard({ id, title, size, updatedAt }: VideoCardProps) {

  return (
    <Link href={`/video/${encodeURIComponent(id)}`}>
      <div className="group cursor-pointer border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="aspect-video bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400 dark:text-gray-600 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>{formatSize(size)}</span>
            <span>{formatDate(updatedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}