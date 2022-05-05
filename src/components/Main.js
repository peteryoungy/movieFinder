import React from 'react';
import { Switch, Route } from "react-router-dom";
import LikePage from "./LikePage";
import Home from './Home';
import Register from './Register';
import Login from './Login';

function Main(props) {
    return (
        <Switch>

            <Route path="/" exact component = {Home}/>
            <Route path="/login" exact component = {Login}/>
            <Route path="/register" exact component = {Register}/>
            <Route path="/likes" exact component = {LikePage}/>

        </Switch>
    );
}

export default Main;