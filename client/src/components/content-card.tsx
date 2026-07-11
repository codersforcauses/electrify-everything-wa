import { ArrowRight, Calendar, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface ContentCardProps {
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

export function ContentCard({
  className,
  imageSrc,
  imageAlt,
  title,
  description,
  href,
  buttonLabel = "View more",
  author,
  dateTime,
}: ContentCardProps) {
  const hasAuthor = Boolean(author);
  const hasDateTime = Boolean(dateTime);

  return (
    <article
      className={cn(
        "group flex aspect-[10/13] h-full w-full max-w-[clamp(18rem,30vw,24rem)] flex-col overflow-hidden rounded-[var(--radius)] border border-border/60 bg-[linear-gradient(0deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.05)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        hasDateTime ? "aspect-[10/13]" : "aspect-[10/11]",
        className,
      )}
    >
      <div className="relative w-full flex-[0_0_55%] overflow-hidden bg-muted">
        <div className="absolute inset-0" />
        {imageSrc ? (
          <Image
            alt={imageAlt}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        <div className="absolute inset-0 bg-background/5" />
      </div>

      <div className="flex flex-1 flex-col gap-[clamp(0.5rem,1.2vw,0.75rem)] p-[clamp(0.5rem,1.2vw,0.75rem)]">
        {hasDateTime ? (
          <div className="items-row flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <p className="text-[clamp(0.75rem,1.7vw,0.875rem)] text-muted-foreground">
              {dateTime}
            </p>
          </div>
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden">
          <div className="max-h-[80%] space-y-2 overflow-hidden">
            <h3 className="overflow-hidden text-[clamp(1rem,2.3vw,1.25rem)] font-semibold leading-[clamp(1.35,2.1vw,1.75)] tracking-tight text-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]">
              {title}
            </h3>
            <p className="overflow-hidden text-[clamp(0.75rem,1.7vw,0.875rem)] leading-[clamp(1.25rem,2.2vw,1.5rem)] text-muted-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box]">
              {description}
            </p>
          </div>

          <div className="items-row flex justify-between gap-2">
            {hasAuthor ? (
              <p className="text-[clamp(0.75rem,1.7vw,0.875rem)] text-muted-foreground">
                By {author}
              </p>
            ) : null}
            <div className="flex items-center justify-between gap-[clamp(0.25rem,0.8vw,0.375rem)]">
              <Link
                aria-label={buttonLabel}
                className="inline-flex w-fit items-center gap-[clamp(0.25rem,0.8vw,0.375rem)] text-[clamp(0.75rem,1.7vw,0.875rem)] font-semibold text-muted-foreground transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                href={href}
              >
                <span>{buttonLabel}</span>
                <ArrowRight
                  className="size-[clamp(0.875rem,1.9vw,1rem)]"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
