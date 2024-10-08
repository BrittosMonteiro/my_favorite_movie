import { IMovies } from "@/types/movies.types";
import { create } from "zustand";

interface ISetStoreSelectedMovie {
  movie: IMovies;
  moviesList: IMovies[];
}

interface Actions {
  setSelectedMovie: (data: IMovies) => void;
  setNewMoviesList: (data: IMovies[]) => void;
}

export const setStoreSelectedMovie = create<ISetStoreSelectedMovie & Actions>(
  (set) => ({
    movie: {
      backdrop_path: "",
      id: 0,
      overview: "",
      poster_path: "",
      title: "",
    },
    moviesList: [],
    setSelectedMovie: (data: IMovies) => set(() => ({ movie: data })),
    setNewMoviesList: (data: IMovies[]) => set(() => ({ moviesList: data })),
  })
);

interface IStoreFilter {
  filterBy: string;
}

interface IStoreFilterActions {
  setFilter: (value: string) => void;
}

export const setStoreFilter = create<IStoreFilter & IStoreFilterActions>(
  (set) => ({
    filterBy: "popular",
    setFilter: (value: IStoreFilter["filterBy"]) =>
      set(() => ({ filterBy: value })),
  })
);
