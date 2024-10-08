import { IMovies } from "@/types/movies.types";
import { create } from "zustand";

interface IUseWatchList {
  watchList: IMovies["id"][];
}

interface IUseWatchListActions {
  updateWatchList: (data: IUseWatchList["watchList"]) => void;
}

export const useWatchList = create<IUseWatchList & IUseWatchListActions>(
  (set) => ({
    watchList: JSON.parse(localStorage.getItem("watchList") || "[]"),
    updateWatchList: (data: IUseWatchList["watchList"]) =>
      set(() => ({ watchList: data })),
  })
);
