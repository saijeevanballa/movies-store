import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { handleSort } from "../utils/utils";
import LoveIcon from "../components/likeIcon";
import Pagination from "../components/padination";
import FilterForm from "../components/filterForm";
import Table from "../components/table";
import { Link } from "react-router-dom";

export default function MovieTable({ history }) {
	const defaultGenre = "All Genres";
	const [movieList, setMovieList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageLimit] = useState(4);
	const [currentGenre, setGenre] = useState(defaultGenre);
	const [genreList, setGenreList] = useState([defaultGenre]);
	const [sortType, setSortType] = useState({ current: "Title", sort: true });
	const [currentSearch, setSearch] = useState("");

	useEffect(() => {
		let movies = getMovies();
		setMovieList(movies);
		setGenreList([defaultGenre, ...new Set(movies.map((m) => m.genre.name))]);
	}, []);

	useEffect(() => {
		document.title = `${movieList.length} Movies`;
	});

	const handleLike = (id) => {
		setMovieList(
			movieList.map((obj) =>
				obj._id === id ? { ...obj, like: !obj.like } : obj
			)
		);
	};

	const hanndleDelete = (id) => {
		let movies = movieList.filter(({ _id }) => _id !== id);
		setMovieList(movies);
	};

	const handlePageData = (clickedPage, totalPages) => {
		let newPage =
			0 < clickedPage && clickedPage <= totalPages ? clickedPage : currentPage;
		if (currentPage !== newPage) {
			setCurrentPage(newPage);
		}
	};

	const handlePageCount = (i) => {
		return (currentPage === 1 ? 0 : (currentPage - 1) * pageLimit) + i + 1;
	};

	const handleFilter = (genre) => {
		setSearch("");
		setGenre(genre);
	};

	const content = [
		{
			title: "#",
			path: "",
			sort: false,
			pointer: false,
			content: (obj, index) => handlePageCount(index)
		},
		{
			title: "Title",
			path: "",
			sort: true,
			pointer: true,
			content: (obj) => <Link to={`/movies/${obj._id}`}>{obj.title}</Link>
		},
		{ title: "Genre", path: "genre.name", sort: true, pointer: true },
		{ title: "Rating", path: "dailyRentalRate", sort: true, pointer: true },
		{
			title: "",
			path: "",
			sort: false,
			pointer: false,
			content: (obj) => (
				<LoveIcon id={obj._id} like={obj.like} onlike={handleLike} />
			)
		},
		{
			title: "",
			path: "",
			sort: false,
			pointer: false,
			content: (obj) => (
				<button
					className="btn btn-danger"
					onClick={() => {
						hanndleDelete(obj._id);
					}}>
					Delete
				</button>
			)
		}
	];

	const table = () => {
		let { pageData, count } = handleSort({
			data: movieList,
			currentGenre: currentGenre !== defaultGenre && currentGenre,
			sortType,
			currentPage,
			pageLimit,
			setCurrentPage,
			search: currentSearch
		});
		return (
			<div className="w-100">
				<div className="">
					<div className="d-flex flex-row justify-content-between">
						<p className="align-self-center m-1">
							showing {count} movies in the database.
						</p>
						<button
							className="btn btn-sm btn-primary m-1"
							onClick={() => history.push("/movies/new")}>
							New Movie
						</button>
					</div>
					<div className="input-group m-2">
						<input
							type="text"
							className="form-control"
							id="formGroupExampleInput"
							placeholder="enter your title"
							aria-describedby="button-addon2"
							value={currentSearch}
							onChange={(e) => {
								setGenre(defaultGenre);
								setSearch(e.target.value);
							}}
						/>
						{currentSearch && (
							<div className="input-group-append">
								<button
									className="btn btn-outline-secondary"
									type="button"
									id="button-addon2"
									onClick={() => setSearch("")}>
									X
								</button>
							</div>
						)}
					</div>
				</div>

				<Table
					content={content}
					setSortType={setSortType}
					sortType={sortType}
					handlePagiantionData={pageData}
				/>
				<Pagination
					counters={count}
					pageLimit={pageLimit}
					currentPage={currentPage}
					onPageClick={handlePageData}
				/>
			</div>
		);
	};

	return (
		<div className="m-5">
			<div className="d-flex flex-row">
				<FilterForm
					listGenre={genreList}
					currentGenre={currentGenre}
					onFilter={handleFilter}
				/>
				{table()}
			</div>
		</div>
	);
}
