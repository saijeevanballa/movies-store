function typeSort(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function handleSort({
  data,
  currentGenre,
  sortType,
  currentPage,
  pageLimit,
  setCurrentPage,
  search,
}) {
  data = search
    ? data.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))
    : data;
  let filterData = currentGenre
    ? data.filter((m) => [m.genre.name].includes(currentGenre))
    : data;
  switch (sortType.current) {
    case "Title": {
      data = filterData.sort((a, b) =>
        typeSort(a.title.toUpperCase(), b.title.toUpperCase())
      );
      break;
    }
    case "Genre": {
      data = filterData.sort((a, b) =>
        typeSort(a.genre.name.toUpperCase(), b.genre.name.toUpperCase())
      );
      break;
    }
    case "Rating": {
      data = filterData.sort((a, b) =>
        typeSort(a.dailyRentalRate, b.dailyRentalRate)
      );
      break;
    }
    default:
  }
  data = sortType.sort ? data : data.reverse();

  let pageData = data.slice(
    currentPage * pageLimit - pageLimit,
    currentPage * pageLimit
  );
  if (!pageData.length && currentPage !== 1) {
    setCurrentPage(currentPage - 1);
  }
  return { pageData, count: filterData.length };
}
