import React from "react";

/* Styles */
import "./styles.scss";

/* React Router DOM */
import { Switch, Route, withRouter } from "react-router-dom";

/* Local Config */
import ConfigRoutes from "../../Config/routingConfig";

/* Components */
import SideBar from "../../Sidebar";

function Layout() {
    return (
        <>
            <div className="main__container">
                <div className="main__container_content">
                    <SideBar />
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
            </div>
        </>
    );
}

export default withRouter(Layout);
