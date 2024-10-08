import { getMovie } from "@/app/api/route";
import { setStoreFilter, setStoreSelectedMovie } from "@/store";
import { useFavoriteList } from "@/store/favoriteListStore";
import { IMovies } from "@/types/movies.types";

export const toFavoriteList = (id: IMovies["id"]): void => {
  const inList: boolean = checkFavoriteList(id);
  handleFavoriteList(id, inList);
};

export const checkFavoriteList = (id: IMovies["id"]): boolean => {
  const localFavoriteList = useFavoriteList.getState().favoriteList;
  if (!localFavoriteList) return false;

  const inList: boolean = localFavoriteList.includes(id);
  return inList;
};

const handleFavoriteList = (id: IMovies["id"], inList: boolean): void => {
  const currentFavoriteList = useFavoriteList.getState().updateFavoriteList;
  let localFavoriteList = useFavoriteList.getState().favoriteList;

  if (!inList) {
    localFavoriteList.unshift(id);
  } else {
    const pos = localFavoriteList.indexOf(id);
    localFavoriteList.splice(pos, 1);
  }

  localStorage.setItem("favoriteList", JSON.stringify(localFavoriteList));
  currentFavoriteList(localFavoriteList);
};

export const getMoviesFromFavoriteList = async (): Promise<void> => {
  const currentWatchList = useFavoriteList.getState().favoriteList;
  const selectedMovieStore = setStoreSelectedMovie.getState().setNewMoviesList;
  const filterByStore = setStoreFilter.getState().setFilter;
  const list = currentWatchList;

  if (list.length === 0) return;

  let fullList: IMovies[] = [];

  for (let id of list) {
    const movie = await getMovie(id);
    fullList.push(movie);
  }

  selectedMovieStore(fullList);
  filterByStore("");
};
