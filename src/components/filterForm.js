import React from "react";
import PropTypes from "prop-types";

function FilterForm(props) {
	return (
		<ul className="list-group m-2 rounded w-25">
			{props.listGenre.map((l, i) => (
				<li
					key={i}
					className={
						props.currentGenre === l
							? "list-group-item active"
							: "list-group-item"
					}
					onClick={() => props.onFilter(l)}>
					{l}
				</li>
			))}
		</ul>
	);
}

export default FilterForm;

// COMPONENT PROPS
FilterForm.propTypes = {
	listGenre: PropTypes.array.isRequired,
	currentGenre: PropTypes.string.isRequired,
	onFilter: PropTypes.func.isRequired
};
