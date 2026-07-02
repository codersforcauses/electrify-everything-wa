import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export const getResources = (
  args?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...args,
    queryKey: ["resources"],
    queryFn: () =>
      api.get("resources/collection/").then((res) => {
        console.log("Result", res);
        console.log("Data", res.data);
        return res.data;
      }),
  });
};
