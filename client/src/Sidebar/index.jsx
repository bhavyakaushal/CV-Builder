import React from "react";

/* React Router DOM */
import { NavLink, withRouter } from "react-router-dom";

/* Images/SVG */
import UserSVG from "../Assets/SVG/User.svg";
import StatsSVG from "../Assets/SVG/stats.svg";
import ProjectsSVG from "../Assets/SVG/projects.svg";
import ReportSVG from "../Assets/SVG/report.svg";
import LogoutSVG from "../Assets/SVG/logout.svg";

/* Styles */
import "./styles.scss";

/* Redux */
import { useDispatch } from "react-redux";
import { authActions } from "../State/actions";

function SideBar() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
    };
    return (
        <aside>
            <div className="aside-group-tabs">
                <NavLink
                    style={{ marginTop: "86px" }}
                    to="/resume"
                    className="S-B3 aside-tab mb-2"
                    activeClassName="active-tab"
                    isActive={(match, location) =>
                        "/resume".includes(location.pathname)
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
            <div className="logout-container" onClick={handleLogout}>
                <div className="logout-icon">
                    <img src={LogoutSVG} alt="sign out" />
                </div>

                <span>Sign Out</span>
            </div>
        </aside>
    );
}

export default withRouter(SideBar);
