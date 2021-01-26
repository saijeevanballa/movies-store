import React from "react";
import PropTypes from "prop-types";
import { LovaDarkIcon, LoveBlankIcon } from "../utils/iconsSvg";
import "../styles.css";

export default function LoveLike(props) {
	return (
		<div className="pointer" onClick={() => props.onlike(props.id)}>
			{!props.like ? <LoveBlankIcon /> : <LovaDarkIcon />}
		</div>
	);
}

// COMPONENT PROPS
LoveLike.propTypes = {
	onlike: PropTypes.func.isRequired,
	like: PropTypes.bool
};
