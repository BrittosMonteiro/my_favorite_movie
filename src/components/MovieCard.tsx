"use client";
import { IMovies } from "@/types/movies.types";
import Image from "next/image";
import React from "react";

interface IMovieCard {
  onClick?: () => void;
  movie: IMovies;
}

export default function MovieCard({ onClick, movie }: IMovieCard) {
  return (
    <div
      className="card w-full sm:max-w-44 h-44 shadow-xl rounded-md backdrop-blur-xl p-2 cursor-pointer"
      onClick={onClick}
    >
      <figure>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="Shoes"
          className="rounded"
          width={1000}
          height={1000}
        />
      </figure>
    </div>
  );
}
