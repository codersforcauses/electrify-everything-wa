import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export interface Resource {
  id: string;
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
  return useQuery<Resource[]>({
    ...args,
    queryKey: ["resources"],
    queryFn: () =>
      api.get("resources/collection/").then((res) => {
        return res.data as Resource[];
      }),
  });
  // TODO: Error handling
};
