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
import Search from "./Search";
import Main from "./Main";

const { Footer, Content } = Layout;

export const authProps = createContext(null);

function App(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth.currentSession()
            .then((res) => {
                const session = res;
                setIsAuthenticated(true);
                // console.log(session);
                // const user = await Auth.currentAuthenticatedUser();
                // setUser(user);
            })
            .catch((error) => {
                if (error !== "No current user") {
                    console.log(error);
                }
            });

        setIsAuthenticating(false);
    }, []);

    return isAuthenticating === false ? (
        <authProps.Provider
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
                <Content className="content">{/* <Main /> */}</Content>
            </Layout>
        </authProps.Provider>
    ) : null;
}

export default App;
