import React from "react";

/* React Router DOM */
import { Switch, Route, withRouter } from "react-router-dom";

/* Local Config */
import ConfigRoutes from "../../Config/routingConfig";

function Layout() {
    return (
        <>
            <div className="main__container">
                <Switch>
                    {ConfigRoutes?.pages?.map(
                        ({ name, Page, path, ...props }) => {
                            return (
                                <Route
                                    {...props}
                                    key={name}
                                    exact={true}
                                    path={path}
                                >
                                    <Page />
                                </Route>
                            );
                        }
                    )}

                    {/* <Redirect to="/login" /> */}
                </Switch>
            </div>
        </>
    );
}

export default withRouter(Layout);
