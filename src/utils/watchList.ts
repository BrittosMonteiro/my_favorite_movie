import { getMovie } from "@/app/api/route";
import { setStoreFilter, setStoreSelectedMovie } from "@/store";
import { useWatchList } from "@/store/watchListStore";
import { IMovies } from "@/types/movies.types";

export const toWatchList = (id: IMovies["id"]): void => {
  const inList: boolean = checkWatchList(id);
  handleWatchList(id, inList);
};

export const checkWatchList = (id: IMovies["id"]): boolean => {
  const localWatchList = useWatchList.getState().watchList;
  if (!localWatchList) return false;

  const inList: boolean = localWatchList.includes(id);
  return inList;
};

const handleWatchList = (id: IMovies["id"], inList: boolean): void => {
  const currentWatchList = useWatchList.getState().updateWatchList;
  let localWatchList = useWatchList.getState().watchList;

  if (!inList) {
    localWatchList.unshift(id);
  } else {
    const pos = localWatchList.indexOf(id);
    localWatchList.splice(pos, 1);
  }

  localStorage.setItem("watchList", JSON.stringify(localWatchList));
  currentWatchList(localWatchList);
};

export const getMoviesFromWatchList = async (): Promise<void> => {
  const currentWatchList = useWatchList.getState().watchList;
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
