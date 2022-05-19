import { Layout } from "antd";
import TopBar from "./TopBar";
// import Main from './Main';
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LikePage from "./LikePage";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import MovieDetail from "./MovieDetail";
import CinemeDetail from "./CinemaDetail";
import { Auth } from "aws-amplify";
import Search from "./Search";

const { Footer, Content } = Layout;

class App extends Component {
    // id: state.user.attributes.sub
    state = {
        isAuthenticated: false,
        isAuthenticating: true,
        user: null,
    };

    setAuthStatus = (authenticated) => {
        this.setState({ isAuthenticated: authenticated });
    };

    setUser = (user) => {
        this.setState({ user: user });
    };

    async componentDidMount() {
        try {
            const session = await Auth.currentSession();
            this.setAuthStatus(true);
            console.log(session);
            const user = await Auth.currentAuthenticatedUser();
            // todo: uncomment this
            this.setUser(user);
        } catch (error) {
            if (error !== "No current user") {
                console.log(error);
            }
        }

        this.setState({ isAuthenticating: false });
    }

    render() {
        const authProps = {
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            setAuthStatus: this.setAuthStatus,
            setUser: this.setUser,
        };
        return (
            !this.state.isAuthenticating && (
                <Layout>
                    <TopBar auth={authProps} />

                    <Content className="content">
                        {/*<Main auth={authProps}/>*/}
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Home {...props} auth={authProps} />
                                )}
                            />

                            <Route
                                exact
                                path="/home"
                                render={(props) => (
                                    <Home {...props} auth={authProps} />
                                )}
                            />

                            <Route
                                exact
                                path="/login"
                                render={(props) => (
                                    <Login {...props} auth={authProps} />
                                )}
                            />

                            <Route
                                exact
                                path="/register"
                                render={(props) => (
                                    <Register {...props} auth={authProps} />
                                )}
                            />

                            <Route
                                exact
                                path="/likes"
                                render={(props) => (
                                    <LikePage {...props} auth={authProps} />
                                )}
                            />
                            <Route
                                exact
                                path="/movie/:movie_id"
                                render={(props) => (
                                    <MovieDetail {...props} auth={authProps} />
                                )}
                            />
                            <Route
                                exact
                                path="/cinema/:cinema_id"
                                render={(props) => (
                                    <CinemeDetail {...props} auth={authProps} />
                                )}
                            />

                            <Route
                                exact
                                path="/search"
                                render={(props) => (
                                    <Search {...props} auth={authProps} />
                                )}
                            />
                        </Switch>
                    </Content>

                    {/* <Footer>Footer</Footer> */}
                </Layout>
            )
        );
    }
}

export default App;
