import { IMovies } from "@/types/movies.types";
import { create } from "zustand";

interface IUseFavoriteList {
  favoriteList: IMovies["id"][];
}

interface IUseFavoriteListActions {
  updateFavoriteList: (data: IUseFavoriteList["favoriteList"]) => void;
}

export const useFavoriteList = create<
  IUseFavoriteList & IUseFavoriteListActions
>((set) => ({
  favoriteList: JSON.parse(localStorage.getItem("favoriteList") || "[]"),
  updateFavoriteList: (data: IUseFavoriteList["favoriteList"]) =>
    set(() => ({ favoriteList: data })),
}));
