import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export interface Resource {
  id: string;
  image: string | null;
  name: string;
  date_made: string;
  author: string;
  slug: string;
  summary: string;
  type: "page" | "file";
  body: string;
  file_url: string | null;
  file_name: string | null;
}
export const getResources = (
  args?: Omit<UseQueryOptions<Resource[]>, "queryKey" | "queryFn">,
) => {
  return useQuery<Resource[], Error>({
    ...args,
    queryKey: ["resources"],
    queryFn: async () => {
      const res = await api.get("resources/collection/");
      return res.data as Resource[];
    },
  });
  // TODO: Error handling
};

export async function fetchResourceFromSlug(slug: string): Promise<Resource[]> {
  const res = await api.get("resources/collection/", {
    params: {
      slug,
    },
  });

  return res.data as Resource[];
} //had to create to use in GetServerSideProps since it needs to be async since it runs outside react

export function getResourceFromSlug(slug: string) {
  return useQuery<Resource[], Error>({
    queryKey: ["resources", slug],
    queryFn: async () => {
      try {
        const res = await fetchResourceFromSlug(slug);
        return res as Resource[];
      } catch (error) {
        throw new Error("Failed to load"); //create instance of error
      }
    },
    enabled: !!slug,
  });
}
