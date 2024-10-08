export type API_URL = string;

export type ENDPOINT_TYPE = string;

export interface IFetchOptions {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
}

export interface IMovies {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  title: string;
}
