import { Layout } from "antd";
import TopBar from "./TopBar";
import React, { Component, useEffect, useState, createContext } from "react";
import { Switch, Route } from "react-router-dom";
import LikePage from "./LikePage";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import MovieDetail from "./MovieDetail";
import CinemeDetail from "./CinemaDetail";
import { Auth } from "aws-amplify";
import Search from "./SearchResult";
import Main from "./Main";

const { Footer, Content } = Layout;

export const authContext = createContext(null);

function App(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth.currentSession()
            .then((res) => {
                console.log("res_session", res);
                setIsAuthenticated(true);

                Auth.currentAuthenticatedUser()
                    .then((res) => {
                        console.log("res_user", res);
                        const user = res;
                        setUser(user);
                    })
                    .catch((error) => {
                        console.log("error", error);
                    });
            })
            .catch((error) => {
                if (error !== "No current user") {
                    console.log(error);
                }
                console.log("error", error);
            });

        setIsAuthenticating(false);
        console.log("did mount.");
    }, []);

    return isAuthenticating === false ? (
        <authContext.Provider
            value={{
                auth: {
                    isAuthenticated,
                    user,
                    setIsAuthenticated,
                    setUser,
                },
            }}
        >
            <Layout>
                <TopBar />
                <Content className="content">
                    <Main />
                </Content>
            </Layout>
        </authContext.Provider>
    ) : null;
}

export default App;
