import Image from "next/image";

type FounderCardProps = {
  name: string;
  role: string;
  image: string;
  rotate?: number;
  objectPosition?: string;
  scale?: number;
};

export function FounderCard({
  name,
  role,
  image,
  rotate = 0,
  objectPosition,
  scale,
}: FounderCardProps) {
  const imageStyle: React.CSSProperties = {};
  if (objectPosition) imageStyle.objectPosition = objectPosition;
  if (scale && scale !== 1) imageStyle.transform = `scale(${scale})`;

  return (
    <figure
      className="w-[240px] shrink-0 rounded-[28px] bg-card p-4 pb-6 shadow-[0_8px_28px_-10px_rgba(42,31,26,0.25)] sm:w-[260px]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[var(--surface)]">
        <Image
          src={image}
          alt={`${name} — ${role}`}
          fill
          sizes="(max-width: 640px) 240px, 260px"
          className="object-cover"
          style={imageStyle}
        />
      </div>
      <figcaption className="mt-5 text-center">
        <div className="text-xl font-bold text-foreground">{name}</div>
        <div className="mt-1 text-base text-muted">{role}</div>
      </figcaption>
    </figure>
  );
}
