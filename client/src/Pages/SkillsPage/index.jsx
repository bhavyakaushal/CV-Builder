import React from "react";

/* Styles */
import "./styles.scss";
import classnames from "classnames";

/* React Router DOM */
import { withRouter } from "react-router-dom";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../State/actions";

/* Images/SVG */
import { ReactComponent as SearchSVG } from "../../Assets/SVG/search.svg";
import { ReactComponent as PlusSVG } from "../../Assets/SVG/plus.svg";
import StarImg from "../../Assets/SVG/star.svg";

/* Global Components */
import Button from "../../Components/Button";
import { DialogBox } from "../../Components/DialogBox";
import SkillsCard from "./Components/SkillsCard";

/* React-select */
import Select from "react-select";

function SkillsPage() {
    const dispatch = useDispatch();
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [skillText, setSkillText] = React.useState("");
    const [rating, setRating] = React.useState();
    const [searchOptions, setSearchOptions] = React.useState([]);
    const error_action = useSelector((state) => state?.user?.error);
    const user_data_redux = useSelector((state) => state?.user);
    const login_user_data_redux = useSelector((state) => state?.auth?.user);
    const skill_added_redux = useSelector((state) => state?.user?.skillAdded);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };
    const handleSkillChange = (e) => {
        setSkillText(e.target.value);
    };

    const addNewSkill = () => {
        dispatch(
            userActions.addNewSkill({
                skill: skillText,
                rating: rating,
                userId: login_user_data_redux.id
            })
        );
        handleClose();
    };

    const handleRatingValue = (value) => {
        setRating(value);
    };
    const isSubmitBtnDisabled = React.useMemo(
        () => !(skillText && skillText.trim() !== "" && rating > 0),
        [skillText, rating]
    );

    const getOptionsdata = () => {
        let data = [];
        for (var i = 0; i < 5; i++) {
            data.push({
                label: user_data_redux?.skills[i].skill,
                value: user_data_redux?.skills[i].skill
            });
        }
        console.log(data);
        return data;
    };
    const [selectedOption, setSelectedOption] = React.useState(null);

    React.useEffect(() => {
        dispatch(userActions.getUserSkills(login_user_data_redux.id));
        if (user_data_redux.skills) setSearchOptions(getOptionsdata());
        setSelectedOption(null);
        setRating(0);
        setSkillText("");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skill_added_redux]);

    React.useEffect(() => {
        if (user_data_redux.skills) setSearchOptions(getOptionsdata());
        setSelectedOption(null);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (selectedOption != null) {
            dispatch(
                userActions.searchUserSkill(
                    selectedOption.value,
                    login_user_data_redux.id
                )
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption]);

    return (
        <main id="skills-page">
            <div className="d-flex align-items-center justify-content-between w-100">
                {error_action && (
                    <p className="text-danger">
                        ERROR - &nbsp;
                        {error_action.message
                            ? error_action.message
                            : error_action}
                    </p>
                )}
                <div className="header-content d-flex align-items-center">
                    <SearchSVG className="ml-2" />
                    <Select
                        defaultValue={selectedOption}
                        options={searchOptions}
                        placeholder="Search for skills"
                        onChange={setSelectedOption}
                    />
                </div>
                <Button
                    style={{ margin: 0, padding: "14px 0px" }}
                    onClick={handleClickOpen}
                >
                    <PlusSVG className="mr-2" />
                    Add a skill
                </Button>
                <DialogBox
                    open={isDialogOpen}
                    title={"Add a New Skill"}
                    handleClose={handleClose}
                    submitText={"Add a Skill"}
                    submitDisabled={isSubmitBtnDisabled}
                    onSubmitFunc={addNewSkill}
                    maxWidth="md"
                >
                    <div className="d-flex flex-column pl-4">
                        <div className="d-flex flex-column standard-input mb-4">
                            <label
                                style={{ color: "#ed1c3c" }}
                                className="L3"
                                for="email"
                            >
                                Skill
                            </label>
                            <input
                                className="L4 dialog-input"
                                type="text"
                                name="skill"
                                value={skillText}
                                placeholder="Enter your skill"
                                onChange={handleSkillChange}
                                required
                            ></input>
                        </div>
                        <div className="standard-input">
                            <label style={{ color: "#ed1c3c" }} className="L3">
                                How would you rate yourself
                            </label>
                            <div>
                                {[...Array(5)].map((_, i) => {
                                    let isActive = false;
                                    const ratingValue = i + 1;
                                    isActive = ratingValue <= (rating || 0);
                                    return (
                                        <label key={i}>
                                            <img
                                                className={classnames("mr-1", {
                                                    ["active"]: isActive
                                                })}
                                                src={StarImg}
                                                onClick={() =>
                                                    handleRatingValue(
                                                        ratingValue
                                                    )
                                                }
                                                alt="Star"
                                                role="button"
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </DialogBox>
            </div>
            {user_data_redux?.skills && (
                <div className="cards-container pr-2">
                    {Array.isArray(user_data_redux?.skills) &&
                        user_data_redux?.skills.map((temp_skills, i) => {
                            return (
                                <SkillsCard
                                    key={temp_skills.id || i}
                                    {...temp_skills}
                                />
                            );
                        })}
                </div>
            )}
        </main>
    );
}

export default withRouter(SkillsPage);
