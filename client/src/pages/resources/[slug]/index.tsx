"use client";

import { GetServerSideProps } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
      props: {
        resource: null,
      },
    };
  }
  try {
    const resource = await fetchResourceFromSlug(slug);
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

function resourceDisplay(resource: Resource[] | null) {
  JSON.stringify(resource);
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
    console.log("it is a file");
    return (
      <div>
        <iframe
          src={resource[0].file_url}
          title="PDF Viewer"
          className="h-[85vh] w-full rounded-lg"
        />
      </div>
    );
  }
  if (resource[0].type == "page") {
    console.log("it is a page");
    return <article className="prose">{resource[0].body}</article>;
  }
  console.log(resource);
  return <div>Unsupported resource type</div>;
}

export default function PDFViewer({ resource }: Props) {
  return (
    <main className="min-h-screen bg-gray-50 pb-8 pt-8">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/resources"
          className="mb-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 text-muted-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-gray-100 hover:text-accent-foreground hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0 active:shadow-md"
        >
          ← Back to Resources
        </Link>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {resourceDisplay(resource)}
        </div>
      </div>
    </main>
  );
}
