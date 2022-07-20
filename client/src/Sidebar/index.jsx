import React from "react";

/* React Router DOM */
import { Link, NavLink, withRouter } from "react-router-dom";

// /* Images/SVG */
import UserSVG from "../Assets/SVG/User.svg";
import StatsSVG from "../Assets/SVG/stats.svg";
import ProjectsSVG from "../Assets/SVG/projects.svg";
import ReportSVG from "../Assets/SVG/report.svg";

/* Styles */
import "./styles.scss";

function SideBar() {
    return (
        <aside>
            <div className="aside-group-tabs">
                <NavLink
                    style={{ marginTop: "86px" }}
                    to="/resume/profile"
                    className="S-B3 aside-tab mb-2"
                    activeClassName="active-tab"
                    isActive={(match, location) =>
                        ["/resume", "/resume/profile"].includes(
                            location.pathname
                        )
                    }
                >
                    <div className="tab-icon">
                        <img src={UserSVG} alt="user" />
                    </div>
                    My Profile
                </NavLink>
                <NavLink
                    to="/resume/skills"
                    className="S-B3 aside-tab mb-2"
                    activeClassName="active-tab"
                >
                    <div className="tab-icon">
                        <img src={StatsSVG} alt="skills" />
                    </div>
                    My Skills
                </NavLink>
                <NavLink
                    to="/resume/projects"
                    className="S-B3 aside-tab mb-2"
                    activeClassName="active-tab"
                >
                    <div className="tab-icon">
                        <img src={ProjectsSVG} alt="projects" />
                    </div>
                    My Projects
                </NavLink>
                <NavLink
                    to="/resume/download"
                    className="S-B3 aside-tab mb-2"
                    activeClassName="active-tab"
                >
                    <div className="tab-icon">
                        <img src={ReportSVG} alt="report" />
                    </div>
                    My Report
                </NavLink>
            </div>
            <div className="logout-container">Sign Out</div>
        </aside>
    );
}

export default withRouter(SideBar);
