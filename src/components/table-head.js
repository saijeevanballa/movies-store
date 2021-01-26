import React from "react";
import PropTypes from "prop-types";
import { Asc, Dsc } from "../utils/iconsSvg";
import "../styles.css";

export default function TableHead(props) {
	const pointer = (point) => (point ? "pointer" : "");

	const {
		sortType: { sort, current },
		setSortType,
		titles
	} = props;

	return (
		<thead>
			<tr>
				{titles.map((t, i) => (
					<th
						key={i}
						className={pointer(t.pointer)}
						onClick={() => {
							if (t.sort) {
								setSortType({
									current: t.title,
									sort: current === t.title ? !sort : true
								});
							}
						}}>
						<div className="d-flex">
							<div className="m-1">{t.title}</div>
							<div>
								{t.sort && current === t.title ? (
									sort ? (
										<Asc />
									) : (
										<Dsc />
									)
								) : null}
							</div>
						</div>
					</th>
				))}
			</tr>
		</thead>
	);
}

// COMPONENT PROPS
TableHead.propTypes = {
	titles: PropTypes.array.isRequired,
	setSortType: PropTypes.func.isRequired,
	sortType: PropTypes.object.isRequired
};
