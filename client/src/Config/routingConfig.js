import React from "react";

/* Internal User */
/* Pages */
const HomePage = React.lazy(() => import("../Pages/HomePage"));
const SkillsPage = React.lazy(() => import("../Pages/SkillsPage"));
const ProjectsPage = React.lazy(() => import("../Pages/ProjectsPage"));
const ReportsPage = React.lazy(() => import("../Pages/ReportsPage"));

const ConfigRoutes = {
    pages: [
        {
            name: "Home page",
            Page: HomePage,
            path: "/resume",
            props: { exact: true }
        },
        {
            name: "Skills page",
            Page: SkillsPage,
            path: "/resume/skills",
            props: {
                exact: true
            }
        },
        {
            name: "Projects page",
            Page: ProjectsPage,
            path: "/resume/projects",
            props: {
                exact: true
            }
        },
        {
            name: "Projects page",
            Page: ReportsPage,
            path: "/resume/report",
            props: {
                exact: true
            }
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
