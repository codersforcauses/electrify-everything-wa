import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  body: string | null;
  author: string | null;
  published_at: string | null;
  image: string;
}

const fetchNews = async () => {
  const response = await api.get<NewsArticle[]>("/news/");

  return response.data;
};

const fetchNewsArticle = async (id: string) => {
  const response = await api.get<NewsArticle>(`/news/${id}/`);

  return response.data;
};

export const useNews = (
  args?: Omit<UseQueryOptions<NewsArticle[]>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...args,
    queryKey: ["news"],
    queryFn: fetchNews,
  });
};

export const useNewsArticle = (
  id?: string,
  args?: Omit<UseQueryOptions<NewsArticle>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...args,
    enabled: Boolean(id) && (args?.enabled ?? true),
    queryKey: ["news", id],
    queryFn: () => fetchNewsArticle(id as string),
  });
};

export const formatPublishedDate = (publishedAt: string | null) => {
  if (!publishedAt) {
    return "Unpublished";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${publishedAt}T00:00:00`));
};
