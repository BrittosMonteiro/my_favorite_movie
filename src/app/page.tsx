"use client";

import HeaderComponent from "@/components/HeaderComponent";
import MoviesComponent from "@/components/MoviesComponent";
import { setStoreSelectedMovie } from "@/store";
import FilterComponent from "@/components/FilterComponent";
import ContentTemplate from "@/template/ContentTemplate";

export default function Home() {
  const movieStore = setStoreSelectedMovie((state) => state);

  return (
    <main
      className="w-full flex min-h-screen items-center flex-col gap-8"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${
          movieStore?.movie?.backdrop_path || null
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "black",
        backgroundAttachment: "fixed",
      }}
    >
      <HeaderComponent />
      <ContentTemplate className="flex flex-col gap-4 max-w-6xl px-2">
        <FilterComponent />
        <MoviesComponent />
      </ContentTemplate>
    </main>
  );
}
