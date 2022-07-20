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
        // {
        //     name: "DashboardPage",
        //     Page: DashboardPage_ClientUser,
        //     path: "/reports/dashboard/:id",
        //     props: {
        //         exact: true
        //     }
        // },
        // {
        //     name: "HomePage",
        //     Page: HomePage_ClientUser,
        //     path: ["/reports", "/reports/home"],
        //     props: {
        //         exact: true
        //     }
        // }
    ]
};

export default ConfigRoutes;
