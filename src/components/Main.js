import React from 'react';
import { Switch, Route } from "react-router-dom";
import LikePage from "./LikePage";
import Home from './Home';
import Register from './Register';
import Login from './Login';
import MovieDetail from './MovieDetail';
import CinemeDetail from './CinemaDetail';


function Main(props) {
    return (
        <Switch>
            {/* todo: /movie/id? cinema/id?  */}
            <Route path="/" exact component = {Home}/>
            <Route path="/home" component = {Home}/>
            <Route path="/login" component = {Login}/>
            <Route path="/register" component = {Register}/>
            <Route path="/likes" component = {LikePage}/>
            <Route path="/movie" component = {MovieDetail}/>
            <Route path="/cinema" component = {CinemeDetail}/>

        </Switch>
    );
}

export default Main;