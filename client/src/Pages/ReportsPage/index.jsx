import React from "react";
import { saveAs } from "file-saver";

/* React Router DOM */
import { withRouter } from "react-router-dom";

/* PDF Render */
import { pdf } from "@react-pdf/renderer";

/* Template */
import DashboardTemplates from "../../template";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../State/actions";

/* Material-UI */
import Avatar from "@mui/material/Avatar";

/* Images/SVG */
import { ReactComponent as DownloadSVG } from "../../Assets/SVG/download.svg";
import { ReactComponent as ShareSVG } from "../../Assets/SVG/share.svg";

/* Components */
import SkillsCard from "../SkillsPage/Components/SkillsCard";
import ProjectsCard from "../ProjectsPage/Components/ProjectsCard";
import Button from "../../Components/Button";

/* Styles */
import "./styles.scss";

function ReportsPage() {
    const dispatch = useDispatch();
    const error_redux = useSelector((state) => state?.user?.error);
    const user_data_redux = useSelector((state) => state?.user);
    const login_user_data_redux = useSelector((state) => state?.auth?.user);
    const [usernameText, setUsernameText] = React.useState(
        user_data_redux?.user?.username ?? login_user_data_redux.username
    );

    React.useEffect(() => {
        console.log("User id:", login_user_data_redux.id);
        if (login_user_data_redux.id) {
            dispatch(userActions.getUserProfile(login_user_data_redux.id));
            dispatch(
                userActions.getSkillsAndProjects(login_user_data_redux.id)
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAvatarName = () => {
        let name = usernameText.split(" ");
        console.log(name);
        if (name.length === 1) {
            return name[0][0].toUpperCase();
        } else {
            return name[0][0].toUpperCase() + name[1][0].toUpperCase();
        }
    };

    const generatePDF = async () => {
        console.log(user_data_redux.finalData.projects);
        const blob = await pdf(
            <DashboardTemplates
                userProfile={user_data_redux?.user}
                skills={user_data_redux?.finalData.skills}
                projects={user_data_redux?.finalData.projects}
            />
        ).toBlob();

        return blob;
    };

    const downloadPDF = async () => {
        const blob = await generatePDF();
        const documentName = `${user_data_redux?.user?.username}_resume.pdf`;

        saveAs(blob, documentName);
    };

    return (
        <div id="reports-page">
            <div className=" d-flex flex-row justify-content-between align-items-center top_section">
                <div className="L5 mb-3"> My Report </div>
                <div className="d-flex">
                    <button className="outlined_btn mr-3">
                        {" "}
                        <ShareSVG className="mr-2" />
                        Share Report
                    </button>
                    <Button onClick={downloadPDF} onKeyPress={downloadPDF}>
                        <DownloadSVG className="mr-2" /> Download Report
                    </Button>
                </div>
            </div>

            {error_redux?.msg && (
                <p className="text-danger">{error_redux.msg}</p>
            )}
            <div className="profile_section">
                <div className="header-content">
                    <div className="d-flex align-items-center">
                        <Avatar
                            sx={{
                                bgcolor: "#ed1c3c",
                                width: "80px",
                                height: "80px",
                                fontSize: "30px"
                            }}
                        >
                            {getAvatarName()}
                        </Avatar>
                        <div className="group-text">
                            <div className="h1 text-capitalize">
                                {usernameText}
                            </div>
                            <div className="L3">
                                {user_data_redux?.user?.email ?? ""}
                            </div>
                            <div className="L3">
                                {" "}
                                {user_data_redux?.user?.contact ?? ""}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-content">
                    <div className="standard-input mt-4">
                        <label className="L3" for="aboutme">
                            About Me
                        </label>
                        <textarea
                            className="L4"
                            name="aboutme"
                            value={user_data_redux?.user?.aboutme ?? ""}
                            placeholder="Edit your profile to enter about me"
                            disabled={true}
                            required
                        ></textarea>
                    </div>
                </div>
            </div>
            {user_data_redux?.finalData && (
                <div className="skills_section">
                    <div className="L5">Skills</div>
                    <div className="cards-container pr-2">
                        {Array.isArray(user_data_redux?.finalData?.skills) &&
                            user_data_redux?.finalData?.skills.map(
                                (temp_skills, i) => {
                                    return (
                                        <SkillsCard
                                            key={temp_skills.id || i}
                                            {...temp_skills}
                                        />
                                    );
                                }
                            )}
                    </div>
                </div>
            )}
            {user_data_redux?.finalData && (
                <div className="projects_section">
                    <div className="L5 mb-3"> Projects </div>
                    <div className="cards-container pr-2 mb-3">
                        {Array.isArray(user_data_redux?.finalData?.projects) &&
                            user_data_redux?.finalData?.projects.map(
                                (temp_projects, i) => {
                                    return (
                                        <ProjectsCard
                                            key={temp_projects.id || i}
                                            {...temp_projects}
                                        />
                                    );
                                }
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default withRouter(ReportsPage);
