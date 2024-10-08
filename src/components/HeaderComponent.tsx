"use client";

import { searchMovie } from "@/app/api/route";
import { setStoreFilter, setStoreSelectedMovie } from "@/store";
import { getMoviesFromFavoriteList } from "@/utils/favoriteList";
import { getMoviesFromWatchList } from "@/utils/watchList";
import {
  BookmarkSimple,
  CheckCircle,
  List,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

export default function HeaderComponent() {
  const movieStore = setStoreSelectedMovie((state) => state);
  const filterBy = setStoreFilter((state) => state);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const sendSearch = async () => {
    if (!searchTerm) return;
    const moviesList = await searchMovie(searchTerm);
    movieStore.setNewMoviesList(moviesList);
    filterBy.setFilter("");
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-1 backdrop-blur-xl sticky top-0 z-90">
      <div className="flex items-center justify-center">
        {/* <span>Logo</span> */}
        <span className="text-base font-semibold">Olá, visitante</span>
      </div>
      <label className="input items-center gap-2 bg-transparent hidden sm:flex focus:outline-none focus:ring-0">
        <input
          type="text"
          className="grow text-base font-semibold focus:outline-none focus:ring-0 placeholder:font-normal placeholder:text-neutral-100"
          placeholder="Pesquisar filme"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MagnifyingGlass size={20} color="#fff" onClick={() => sendSearch()} />
      </label>
      <div className="flex gap-2 items-center justify-between">
        <BookmarkSimple
          size={20}
          color="#fff"
          weight="fill"
          className="hidden sm:inline-block cursor-pointer"
          onClick={() => getMoviesFromWatchList()}
        />
        <CheckCircle
          size={20}
          weight="fill"
          color="#fff"
          className="hidden sm:inline-block cursor-pointer"
          onClick={() => getMoviesFromFavoriteList()}
        />
        <div className="dropdown dropdown-bottom dropdown-end sm:hidden z-90">
          <List tabIndex={0} role="button" />
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded w-52 p-2 shadow z-90"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
