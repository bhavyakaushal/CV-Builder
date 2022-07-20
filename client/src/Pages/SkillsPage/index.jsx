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

/* React-select */
import Select from "react-select";

const aquaticCreatures = [
    { label: "Shark", value: "Shark" },
    { label: "Dolphin", value: "Dolphin" },
    { label: "Whale", value: "Whale" },
    { label: "Octopus", value: "Octopus" },
    { label: "Crab", value: "Crab" },
    { label: "Lobster", value: "Lobster" }
];

function SkillsPage() {
    const dispatch = useDispatch();
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [skillText, setSkillText] = React.useState("");
    const [rating, setRating] = React.useState();

    const login_user_data_redux = useSelector((state) => state?.auth?.user);

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
        // dispatch(
        //     userActions.addNewSkill({
        //         skill: skillText,
        //         rating: rating,
        //         userId: login_user_data_redux.id
        //     })
        // );
        handleClose();
    };

    const handleRatingValue = (value) => {
        setRating(value);
    };
    const isSubmitBtnDisabled = React.useMemo(
        () => !(skillText && skillText.trim() !== "" && rating > 0),
        [skillText, rating]
    );

    return (
        <main id="skills-page">
            <div className="d-flex align-items-center justify-content-between w-100">
                <div className="header-content d-flex align-items-center">
                    <SearchSVG className="ml-2" />
                    <Select
                        options={aquaticCreatures}
                        placeholder="Search for skills"
                    />
                </div>
                <Button
                    style={{ margin: 0, padding: "14px 0px" }}
                    onClick={handleClickOpen}
                    // onKeyPress={saveUpdatedData}
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
                                Email address
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
                            <div className="feedback-icons-group">
                                {[...Array(5)].map((_, i) => {
                                    const ratingValue = i + 1;

                                    const isActive =
                                        ratingValue <= (rating || 0);

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
        </main>
    );
}

export default withRouter(SkillsPage);
