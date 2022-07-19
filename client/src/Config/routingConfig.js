import React from "react";

/* Internal User */
/* Pages */
const HomePage = React.lazy(() => import("../Pages/HomePage"));

const ConfigRoutes = {
    pages: [
        {
            name: "Home page",
            Page: HomePage,
            path: "/resume",
            props: {}
        }
    ]
};

export default ConfigRoutes;
