import { getMovies } from "@/app/api/route";
import { setStoreFilter, setStoreSelectedMovie } from "@/store";
import { IAvailableFilters } from "@/types/filters.types";
import React, { useEffect } from "react";

export default function FilterComponent() {
  const filterStore = setStoreFilter((state) => state);
  const movieStore = setStoreSelectedMovie((state) => state);

  const availableFilters: IAvailableFilters[] = [
    {
      description: "Populares",
      id: "popular",
    },
    {
      description: "Melhores avaliados",
      id: "top_rated",
    },
    {
      description: "Em cartaz",
      id: "now_playing",
    },
    {
      description: "Em breve",
      id: "upcoming",
    },
  ];

  const switchMovies = async (value: string = "popular") => {
    const moviesList = await getMovies(value);
    filterStore.setFilter(value);
    movieStore.setNewMoviesList(moviesList);
  };

  useEffect(() => {
    switchMovies();
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-2">
      {availableFilters.map(({ description, id }, index) => (
        <button
          className={`btn btn-sm rounded-btn text-white bg-transparent hover:bg-transparent backdrop-blur-xl ${
            filterStore.filterBy === id
              ? "border-white"
              : "border-transparent hover:border-transparent"
          }`}
          key={index}
          onClick={() => switchMovies(id)}
        >
          {description}
        </button>
      ))}
    </div>
  );
}
