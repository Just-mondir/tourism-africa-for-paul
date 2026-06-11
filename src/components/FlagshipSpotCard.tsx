import Image from "next/image";
import Link from "next/link";

interface FlagshipSpotCardProps {
  title: string;
  description: string;
  image: string;
  country: string;
  href: string;
}

export default function FlagshipSpotCard({
  title,
  description,
  image,
  country,
  href,
}: FlagshipSpotCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-secondary-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-56 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-secondary-900">
          {country}
        </span>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
        <p className="text-sm text-secondary-600">{description}</p>
        <span className="inline-flex items-center text-sm font-semibold text-primary-600">
          Read the guide
        </span>
      </div>
    </Link>
  );
}
