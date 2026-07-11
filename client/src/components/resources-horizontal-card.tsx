import { ArrowRight, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface HorizontalCardProps {
  className?: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
  buttonLabel?: string;
  author?: string;
  dateTime?: string;
}

export function HorizontalCard({
  className,
  imageSrc,
  imageAlt,
  title,
  description,
  href,
  buttonLabel = "View More",
  author,
  dateTime,
}: HorizontalCardProps) {
  const meta = [author, dateTime].filter(Boolean).join(" • ");

  return (
    <article
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:min-h-[clamp(18rem,26vw,23rem)] md:flex-row",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted md:aspect-auto md:w-1/2 md:self-stretch">
        {imageSrc ? (
          <Image
            alt={imageAlt}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            src={imageSrc}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <ImageOff
              className="size-[clamp(2rem,7vw,4rem)]"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-[clamp(0.5rem,1.5vw,1rem)] p-[clamp(1.25rem,2.5vw,2rem)]">
        {meta ? (
          <p className="text-[clamp(0.8rem,1.6vw,0.9rem)] font-semibold text-primary">
            {meta}
          </p>
        ) : null}

        <h3 className="overflow-hidden text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-tight tracking-tight text-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]">
          {title}
        </h3>

        <p className="overflow-hidden text-[clamp(0.9rem,1.8vw,1.05rem)] leading-relaxed text-muted-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box]">
          {description}
        </p>

        <Link
          aria-label={buttonLabel}
          className="mt-1 inline-flex w-fit items-center gap-[clamp(0.25rem,0.8vw,0.375rem)] text-[clamp(0.85rem,1.7vw,0.95rem)] font-semibold text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href={href}
        >
          <span>{buttonLabel}</span>
          <ArrowRight
            className="size-[clamp(1rem,1.9vw,1.15rem)]"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
