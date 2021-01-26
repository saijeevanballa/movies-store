import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./views/movie-table";
import Customer from "./views/customer";
import Rentals from "./views/rentals";
import NotFound from "./views/notFound";
import Movie from "./views/movie-details";
import Login from "./views/login";
import Register from "./views/register";

export default function RoutingComp() {
	return (
		<div>
			<Switch>
				<Route path="/movies/:id" component={Movie} />
				<Route path="/movies" component={Movies} />
				<Route path="/customer" component={Customer} />
				<Route path="/rental" component={Rentals} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Redirect exact from="/" to="/login" />
				<Route path="*" component={NotFound} />
			</Switch>
		</div>
	);
}
