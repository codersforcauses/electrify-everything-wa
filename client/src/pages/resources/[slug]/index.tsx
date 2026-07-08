"use client";

import { GetServerSideProps } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

//later: make interface have promise, and also implement async function to get the resource based on the url

//implement getPDFbySlug async function that will take a slug and return pdf url

interface Props {
  pdfUrl: string;
}

const DEFAULT_PDF =
  "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf";

async function getPDFBySlug(slug: string): Promise<string | undefined> {
  const pdfUrls: Record<string, string> = {
    Slug1: "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf",
  };

  return pdfUrls[slug];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const slug = params?.slug as string | undefined;

  if (!slug) {
    return {
      props: {
        pdfUrl: DEFAULT_PDF,
      },
    };
  }

  const pdfUrl = await getPDFBySlug(slug);
  return {
    props: {
      pdfUrl: pdfUrl ?? DEFAULT_PDF,
    },
  };
};

export default function PDFViewer({ pdfUrl }: Props) {
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
          <embed
            src={pdfUrl}
            type="application/pdf"
            className="h-[85vh] w-full"
          />
        </div>
      </div>
    </main>
  );
}
