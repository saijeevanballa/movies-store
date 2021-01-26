import React from "react";
import PropTypes from "prop-types";

function getValue(object, path) {
	return path.split(".").reduce((o, k) => (o || {})[k], object);
}

export default function TableBody(props) {
	return (
		<tbody>
			{props.bodyItems.map((obj, i) => {
				return (
					<tr key={obj._id}>
						{props.colomn.map((row, si) => (
							<td key={si}>
								{row.path ? getValue(obj, row.path) : row.content(obj, i)}
							</td>
						))}
					</tr>
				);
			})}
		</tbody>
	);
}

// COMPONENT PROPS
TableBody.propTypes = {
	bodyItems: PropTypes.array.isRequired,
	colomn: PropTypes.array.isRequired
};
