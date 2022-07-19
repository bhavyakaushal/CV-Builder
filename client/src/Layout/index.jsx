import React, { Suspense } from "react";

/* React Router DOM */
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

/* Theme */
import "../Scss/theme.scss";

/* Redux */
import { useSelector } from "react-redux";

/* Utils */
import { history } from "../Utils/history";

/* Lazy Loading Pages */
const RegisterPage = React.lazy(() => import("../Pages/RegisterPage"));
const LoginPage = React.lazy(() => import("../Pages/LoginPage"));
const LoggedRoutes = React.lazy(() => import("../Pages/Routes"));

function App() {
    const isAuthenticated = useSelector((state) => state.auth.loggedIn);

    const PrivateRoute = ({ children, ...rest }) => {
        return (
            <Suspense fallback={<div>Loading</div>}>
                <Route
                    {...rest}
                    render={(props) =>
                        isAuthenticated ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: {
                                        from: props.location
                                    }
                                }}
                            />
                        )
                    }
                />
            </Suspense>
        );
    };

    const PublicRoute = ({ children, ...rest }) => {
        return (
            <Suspense fallback={<div>Loading</div>}>
                <Route
                    {...rest}
                    render={() =>
                        isAuthenticated ? (
                            <Redirect
                                to={{
                                    pathname: "/resume"
                                }}
                            />
                        ) : (
                            children
                        )
                    }
                />
            </Suspense>
        );
    };
    return (
        <div className="App">
            <BrowserRouter history={history}>
                <Switch>
                    <PrivateRoute exact path="/resume">
                        <LoggedRoutes />
                    </PrivateRoute>
                    <PublicRoute exact path="/">
                        <LoginPage />
                    </PublicRoute>
                    <PublicRoute exact path="/register">
                        <RegisterPage />
                    </PublicRoute>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
