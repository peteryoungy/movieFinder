import React from "react";
import { Switch, Route } from "react-router-dom";
import LikePage from "./LikePage";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import MovieDetail from "./MovieDetail";
import CinemeDetail from "./CinemaDetail";
import SearchResult from "./SearchResult";

function Main(props) {
    return (
        <Switch>
            {/* todo: /movie/id? cinema/id?  */}
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/likes" component={LikePage} />
            <Route path="/movie/:movie_id" component={MovieDetail} />
            <Route path="/cinema/:cinema_id" component={CinemeDetail} />
            <Route path="/search" component={SearchResult} />
        </Switch>
    );
}

export default Main;
