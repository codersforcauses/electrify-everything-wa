import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { fetchResourceFromSlug, Resource } from "@/hooks/apiService";

//implement getPDFbySlug async function that will take a slug and return pdf url

interface Props {
  resource: Resource[] | null; //resource defined in api service
}

const DEFAULT_PDF =
  "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf";

//used in pages router to fetch data for interface Props at request time
export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const slug = params?.slug as string | undefined;

  if (!slug) {
    return {
      notFound: true,
    };
  }
  try {
    const resource = await fetchResourceFromSlug(slug);

    if (resource.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        resource,
      }, //returns props object that page component will recieve
    };
  } catch (error) {
    return {
      props: {
        resource: null,
      },
    };
  }
};

function ResourceHeader({ resource }: { resource: Resource }) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={16} />
          {resource.date_made}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C000CC]/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-[#C000CC]">
          <FileText size={13} />
          {resource.type}
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {resource.name}
      </h1>

      {resource.author ? (
        <p className="mt-2 text-sm text-muted-foreground">
          By {resource.author}
        </p>
      ) : null}

      <div className="mt-5 h-1 w-16 rounded-full bg-[#C000CC]" />

      {resource.summary ? (
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {resource.summary}
        </p>
      ) : null}
    </header>
  );
}

function ResourceContent({ resource }: { resource: Resource[] | null }) {
  if (!resource) {
    return (
      <embed
        src={DEFAULT_PDF}
        type="application/pdf"
        className="h-[85vh] w-full"
      />
    );
  }
  if (resource[0].type == "file" && resource[0].file_url != null) {
    return (
      <iframe
        src={resource[0].file_url}
        title="PDF Viewer"
        className="h-[85vh] w-full rounded-lg border border-border/60"
      />
    );
  }
  if (resource[0].type == "page") {
    return (
      <article className="whitespace-pre-line py-8 text-base leading-relaxed text-foreground">
        {resource[0].body}
      </article>
    );
  }
  return (
    <div className="px-6 py-8 text-muted-foreground">
      Unsupported resource type
    </div>
  );
}

export default function PDFViewer({ resource }: Props) {
  return (
    <main className="min-h-screen bg-muted/30 pb-12 pt-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/resources"
          className="group mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-[#C000CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to Resources
        </Link>

        {resource ? <ResourceHeader resource={resource[0]} /> : null}

        <ResourceContent resource={resource} />
      </div>
    </main>
  );
}
