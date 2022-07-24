import React from "react";

/* Styles */
import "./styles.scss";

/* React Router DOM */
import { withRouter } from "react-router-dom";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../State/actions";

/* Images/SVG */
import { ReactComponent as SearchSVG } from "../../Assets/SVG/search.svg";
import { ReactComponent as PlusSVG } from "../../Assets/SVG/plus.svg";

/* Components */
import Button from "../../Components/Button";
import { DialogBox } from "../../Components/DialogBox";
import ProjectsCard from "./Components/ProjectsCard";
import ArrayField from "./Components/ArrayField";

/* React-select */
import Select from "react-select";

function ProjectsPage() {
    const dispatch = useDispatch();
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [projectTitle, setProjectTitle] = React.useState("");
    const [projectDesc, setProjectDesc] = React.useState("");
    const [skillsData, setSkillsData] = React.useState("");
    const [searchOptions, setSearchOptions] = React.useState([]);

    const user_data_redux = useSelector((state) => state?.user);
    const login_user_data_redux = useSelector((state) => state?.auth?.user);
    const error_action = useSelector((state) => state?.user?.error);
    const project_added_redux = useSelector(
        (state) => state?.user?.projectAdded
    );

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };
    const handleProjectTitleChange = (e) => {
        setProjectTitle(e.target.value);
    };
    const handleProjectDescChange = (e) => {
        setProjectDesc(e.target.value);
    };

    const handleSkillsData = (val) => {
        setSkillsData(val);
    };

    const addNewProject = () => {
        dispatch(
            userActions.addNewProjects({
                title: projectTitle,
                description: projectDesc,
                userId: login_user_data_redux.id,
                skillName: skillsData
            })
        );
        if (!error_action) handleClose();
    };

    const isSubmitBtnDisabled = React.useMemo(
        () =>
            !(
                projectTitle &&
                projectTitle.trim() !== "" &&
                projectDesc &&
                projectDesc.trim() !== ""
            ),
        [projectTitle, projectDesc]
    );

    const getOptionsdata = () => {
        let data = [];
        for (var i = 0; i < user_data_redux?.projects.length && i < 5; i++) {
            data.push({
                label: user_data_redux?.projects[i].title,
                value: user_data_redux?.projects[i].title
            });
        }
        return data;
    };
    const [selectedOption, setSelectedOption] = React.useState(null);

    React.useEffect(() => {
        dispatch(userActions.getUserProjects(login_user_data_redux.id));
        if (user_data_redux.projects) setSearchOptions(getOptionsdata());
        setSelectedOption(null);
        setProjectDesc("");
        setProjectTitle("");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project_added_redux]);

    React.useEffect(() => {
        if (user_data_redux.projects) setSearchOptions(getOptionsdata());
        setSelectedOption(null);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (selectedOption != null) {
            dispatch(
                userActions.searchUserProjects(
                    selectedOption.value,
                    login_user_data_redux.id
                )
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption]);

    return (
        <main id="projects-page">
            <div className="d-flex align-items-center justify-content-between w-100">
                <div className="header-content d-flex align-items-center">
                    <SearchSVG className="ml-2" />
                    <Select
                        defaultValue={selectedOption}
                        options={searchOptions}
                        placeholder="Search for projects"
                        onChange={setSelectedOption}
                    />
                </div>
                <Button
                    style={{ margin: 0, padding: "14px 0px" }}
                    onClick={handleClickOpen}
                >
                    <PlusSVG className="mr-2" />
                    Add a Project
                </Button>
                <DialogBox
                    open={isDialogOpen}
                    title={"Add a New Project"}
                    handleClose={handleClose}
                    submitText={"Add Project"}
                    submitDisabled={isSubmitBtnDisabled}
                    onSubmitFunc={addNewProject}
                    maxWidth="md"
                >
                    <div className="d-flex flex-column pl-4">
                        {error_action?.msg && (
                            <p className="text-danger">{error_action.msg}</p>
                        )}
                        <div className="d-flex flex-column standard-input mb-4">
                            <label
                                style={{ color: "#ed1c3c" }}
                                className="L3"
                                for="project"
                            >
                                Project Title
                            </label>
                            <input
                                className="L4 dialog-input"
                                type="text"
                                name="project"
                                value={projectTitle}
                                placeholder="Enter your project title"
                                onChange={handleProjectTitleChange}
                                required
                            ></input>
                        </div>
                        <div className="d-flex flex-column standard-input mb-4">
                            <label
                                style={{ color: "#ed1c3c" }}
                                className="L3"
                                for="desc"
                            >
                                Project Description
                            </label>
                            <textarea
                                className="L4 dialog-input"
                                name="desc"
                                style={{ height: "100px" }}
                                value={projectDesc}
                                placeholder="Enter your project description"
                                onChange={handleProjectDescChange}
                                required
                            ></textarea>
                        </div>
                        <div className="d-flex flex-column standard-input">
                            <label
                                style={{ color: "#ed1c3c" }}
                                className="L3"
                                for="skills"
                            >
                                Add Project Skills
                            </label>
                            <ArrayField setSkillsData={handleSkillsData} />
                        </div>
                    </div>
                </DialogBox>
            </div>
            {user_data_redux?.projects && (
                <div className="cards-container pr-2">
                    {Array.isArray(user_data_redux?.projects) &&
                        user_data_redux?.projects.map((temp_projects, i) => {
                            return (
                                <ProjectsCard
                                    key={temp_projects.id || i}
                                    {...temp_projects}
                                />
                            );
                        })}
                </div>
            )}
        </main>
    );
}

export default withRouter(ProjectsPage);
