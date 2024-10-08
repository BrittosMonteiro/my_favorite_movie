"use server";

import {
  type API_URL,
  ENDPOINT_TYPE,
  IFetchOptions,
  IMovies,
} from "@/types/movies.types";

const API_TOKEN: string = process.env.API_TOKEN!;
const API_URL: API_URL = process.env.API_URL!;

const options: IFetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

const getMovies = async (
  type: ENDPOINT_TYPE = "popular"
): Promise<IMovies[]> => {
  const request = await fetch(
    `${API_URL}/${type}?language=pt-BR&page=1`,
    options
  );
  const response = await request.json();
  return response.results.slice(0, 12);
};

const searchMovie = async (movie: string): Promise<IMovies[]> => {
  const request = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=pt-BR&page=1`,
    options
  );
  const response = await request.json();
  return response.results.splice(0, 12);
};

export const getMovie = async (id: IMovies["id"]): Promise<IMovies> => {
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=genre%2Crecommendations%2Cvideos%2Cwatch%2Fproviders&language=pt-BR`,
    options
  );
  const response = await request.json();
  return response;
};

export { getMovies, searchMovie };
