import React from "react";
import TableHead from "./table-head";
import TableBody from "./table-body";
import PropTypes from "prop-types";

export default function Table(props) {
	return (
		<table className="table table-hover">
			<TableHead
				titles={props.content}
				sortType={props.sortType}
				setSortType={props.setSortType}
			/>
			<TableBody
				bodyItems={props.handlePagiantionData}
				colomn={props.content}
			/>
		</table>
	);
}

// COMPONENT PROPS
Table.propTypes = {
	content: PropTypes.array.isRequired,
	setSortType: PropTypes.func.isRequired,
	sortType: PropTypes.object.isRequired,
	handlePagiantionData: PropTypes.array
};
