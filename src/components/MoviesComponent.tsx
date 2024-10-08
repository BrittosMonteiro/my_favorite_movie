"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { BookmarkSimple, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { IMovies } from "@/types/movies.types";
import { setStoreSelectedMovie } from "@/store";
import { toWatchList } from "@/utils/watchList";
import { toFavoriteList } from "@/utils/favoriteList";
import { useWatchList } from "@/store/watchListStore";
import { useFavoriteList } from "@/store/favoriteListStore";

export default function MoviesComponent() {
  const movieStore = setStoreSelectedMovie((state) => state);
  const watchListStore = useWatchList((state) => state);
  const favoriteListStore = useFavoriteList((state) => state);

  const [movies, setMovies] = useState<IMovies[]>([]);

  const selectMovie = (movie: IMovies): void => {
    movieStore.setSelectedMovie(movie);
  };
  useEffect(() => {
    setMovies(movieStore.moviesList);
    selectMovie(movieStore.moviesList[0]);
  }, [movieStore.moviesList]);

  return (
    <section className="w-full flex flex-col gap-8">
      <article className="flex flex-col gap-4 backdrop-blur-xl p-4 rounded min-h-44 justify-between">
        <h1 className="text-2xl font-semibold">{movieStore.movie?.title}</h1>
        <p className="text-base line-clamp-3">{movieStore.movie?.overview}</p>
        <div className="flex gap-2">
          <BookmarkSimple
            size={24}
            weight={
              watchListStore.watchList.includes(movieStore.movie?.id)
                ? "fill"
                : "regular"
            }
            color="#fff"
            className="cursor-pointer"
            onClick={() => toWatchList(movieStore.movie.id)}
          />
          <CheckCircle
            size={24}
            weight={
              favoriteListStore.favoriteList.includes(movieStore.movie?.id)
                ? "fill"
                : "regular"
            }
            color="#fff"
            className="cursor-pointer"
            onClick={() => toFavoriteList(movieStore.movie.id)}
          />
        </div>
      </article>

      {/* Movies list */}
      <div className="w-full flex gap-4 flex-wrap items-center justify-between">
        {movies.map(({ backdrop_path, id, overview, poster_path, title }) => (
          <MovieCard
            key={id}
            onClick={() =>
              selectMovie({ backdrop_path, id, overview, poster_path, title })
            }
            movie={{ backdrop_path, id, overview, poster_path, title }}
          />
        ))}
      </div>
    </section>
  );
}
