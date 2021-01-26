import React from "react";
import PropTypes from "prop-types";

export default function Pagination(props) {
	const { counters, currentPage, pageLimit, onPageClick } = props;

	let pages = Math.ceil(counters / pageLimit);

	let page = Array(pages)
		.fill()
		.map((n, i) => i + 1);
	if (pages <= 1) return null;

	const disabledClass = (disablePage) => {
		return currentPage === disablePage ? "page-item disabled" : "page-item ";
	};

	return (
		<nav>
			<ul className="pagination">
				<li
					className={disabledClass(1)}
					onClick={() => onPageClick(currentPage - 1, pages)}>
					<a className="page-link" href="#!" tabIndex="-1">
						Previous
					</a>
				</li>
				{page.map((pageNum) => {
					return (
						<li
							key={pageNum}
							className={
								currentPage === pageNum ? "page-item active" : "page-item"
							}
							onClick={() => onPageClick(pageNum, pages)}>
							<a className="page-link" href="#!">
								{pageNum}
							</a>
						</li>
					);
				})}
				<li
					className={disabledClass(pages)}
					disabled
					onClick={() => onPageClick(currentPage + 1, pages)}>
					<a className="page-link" href="#!">
						Next
					</a>
				</li>
			</ul>
		</nav>
	);
}

// COMPONENT PROPS
Pagination.propTypes = {
	counters: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	pageLimit: PropTypes.number.isRequired,
	onPageClick: PropTypes.func.isRequired
};
