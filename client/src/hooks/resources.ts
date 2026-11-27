import { useQuery } from "@tanstack/react-query";

export interface Resource {
  id: string;
  date_made: string;
  author: string;
  image: string | null;
  name: string;
  slug: string;
  summary: string;
  type: "page" | "file";
  body: string;
  file_url: string;
  file_name: string;
}

const MOCK_RESOURCES: Resource[] = [
  {
    id: "1",
    date_made: "2022-02-04",
    author: "John Doe",
    image: null,
    name: "New feature available on Devias",
    slug: "new-feature",
    summary:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    type: "page",
    body: "",
    file_url: "",
    file_name: "",
  },
  {
    id: "2",
    date_made: "2023-08-15",
    author: "Jane Smith",
    image: null,
    name: "How to electrify your home",
    slug: "electrify-your-home",
    summary: "A practical guide to going all-electric in Western Australia.",
    type: "page",
    body: "",
    file_url: "",
    file_name: "",
  },
];

export function useResources() {
  return useQuery({
    queryKey: ["resources"],
    queryFn: async (): Promise<Resource[]> => {
      // Swap this block for the real fetch once the endpoint lands:
      // const res = await fetch("/api/resources/");
      // return res.json();
      return MOCK_RESOURCES;
    },
  });
}
