import React from "react";
import RouterComp from "./router";
import NavBar from "./components/navbar";

export default function App() {
	return (
		<div>
			<NavBar />
			<div className="m-2">
				<RouterComp />
			</div>
		</div>
	);
}
