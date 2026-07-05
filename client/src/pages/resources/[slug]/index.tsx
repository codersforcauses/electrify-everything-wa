"use client";

import { GetServerSideProps } from "next";
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
    <main style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" />
    </main>
  );
}
