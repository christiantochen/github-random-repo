"use server";

import OctokitSingleton from "@/octokit";

export interface SearchRepositoriesQuery {
  search?: string;
  language?: string;
  sort?: "stars" | "forks" | "updated";
  order?: "asc" | "desc";
  per_page?: number;
  page?: number;
}

export const searchRepositories = async (query?: SearchRepositoriesQuery) => {
  const octokit = OctokitSingleton.getInstance();

  let queryString = "q=";

  if (query) {
    queryString =
      queryString +
      query.search +
      (query.language ? "+language:" + query.language : "") +
      (query.sort ? "&sort=" + query.sort : "") +
      (query.order ? "&order=" + query.order : "") +
      (query.per_page ? "&per_page=" + query.per_page : "") +
      (query.page ? "&page=" + query.page : "");
  }

  return octokit.request("GET /search/repositories", {
    headers: {
      "X-Github-Api-Version": "2022-11-28",
    },
    q: queryString,
  });
};
