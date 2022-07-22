import React from "react";

/* Styles */
import "./styles.scss";

/* React Router DOM */
import { withRouter } from "react-router-dom";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../State/actions";

/* Global Components */
import Button from "../../Components/Button";

/* Material-UI */
import Avatar from "@mui/material/Avatar";

/* Images/SVG */
import { ReactComponent as EditSVG } from "../../Assets/SVG/edit.svg";

function HomePage() {
    const dispatch = useDispatch();
    const error_redux = useSelector((state) => state?.user?.error);
    const user_data_redux = useSelector((state) => state?.user?.user);
    const login_user_data_redux = useSelector((state) => state?.auth?.user);
    const [usernameText, setUsernameText] = React.useState(
        user_data_redux?.username ?? login_user_data_redux.username
    );
    const [aboutmeText, setAboutmeText] = React.useState("");
    const [emailText, setEmailText] = React.useState("");
    const [contactText, setContactText] = React.useState("");
    const [isEditable, setEditable] = React.useState(true);

    const isValidEmail = (email) => {
        return email &&
            new RegExp(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
            ).test(email)
            ? true
            : false;
    };

    const isValidContact = (contact) => {
        let isnum = /^\d+$/.test(contact);
        return contact && isnum && contact.length === 10 ? true : false;
    };

    const handleContactChange = (e) => {
        setContactText(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmailText(e.target.value);
    };

    const handleAboutmeChange = (e) => {
        setAboutmeText(e.target.value);
    };

    const checkDisabled = () => {
        if (
            !(
                (emailText && !isValidEmail(emailText)) ||
                (contactText && isValidContact(contactText))
            )
        ) {
            return true;
        } else {
            return false;
        }
    };
    const saveUpdatedData = () => {
        if (!checkDisabled()) {
            dispatch(
                userActions.updateUserProfile(
                    contactText,
                    aboutmeText,
                    emailText
                )
            );
        }
        setEditable(true);
    };

    const getAvatarName = () => {
        let name = usernameText.split(" ");
        console.log(name);
        if (name.length === 1) {
            return name[0][0].toUpperCase();
        } else {
            return name[0][0].toUpperCase() + name[1][0].toUpperCase();
        }
    };

    React.useEffect(() => {
        console.log("User id:", login_user_data_redux.id);
        setEditable(true);
        if (login_user_data_redux.id) {
            dispatch(userActions.getUserProfile(login_user_data_redux.id));
            dispatch(userActions.getUserSkills(login_user_data_redux.id));
            dispatch(userActions.getUserProjects(login_user_data_redux.id));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        setAboutmeText(user_data_redux?.aboutme ?? "");
        setContactText(user_data_redux?.contact ?? "");
        setEmailText(user_data_redux?.email ?? "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user_data_redux]);

    return (
        <main id="home-page">
            <div className="header-content">
                <div className="d-flex align-items-center">
                    <Avatar
                        sx={{
                            bgcolor: "#ed1c3c",
                            width: "70px",
                            height: "70px",
                            fontSize: "28px"
                        }}
                    >
                        {getAvatarName()}
                    </Avatar>
                    <div className="h1 text-capitalize ml-5">
                        {usernameText}
                    </div>
                </div>
                {isEditable ? (
                    <EditSVG
                        className="btn_img"
                        role="button"
                        onClick={() => setEditable(false)}
                    />
                ) : (
                    <Button
                        className="mr-3"
                        style={{ minWidth: "auto", margin: 0 }}
                        onClick={saveUpdatedData}
                        onKeyPress={saveUpdatedData}
                        disabled={checkDisabled()}
                    >
                        Save
                    </Button>
                )}
            </div>
            {error_redux?.msg && (
                <p className="text-danger">{error_redux.msg}</p>
            )}
            <div className="form-content">
                <div className="standard-input">
                    <label className="L3" for="email">
                        Email address
                    </label>
                    <input
                        className="L4"
                        type="email"
                        name="email"
                        value={emailText}
                        placeholder="Enter your email"
                        onChange={handleEmailChange}
                        disabled={isEditable}
                        required
                    ></input>
                </div>
                <div className="standard-input mt-4">
                    <label className="L3" for="contact">
                        Contact
                    </label>
                    <input
                        className="L4"
                        type="tel"
                        name="contact"
                        value={contactText}
                        placeholder="Enter your contact number"
                        onChange={handleContactChange}
                        disabled={isEditable}
                        required
                    ></input>
                </div>
                <div className="standard-input mt-4">
                    <label className="L3" for="aboutme">
                        About Me
                    </label>
                    <textarea
                        className="L4"
                        name="aboutme"
                        value={aboutmeText}
                        placeholder="Tell us what you do"
                        onChange={handleAboutmeChange}
                        disabled={isEditable}
                        required
                    ></textarea>
                </div>
            </div>
        </main>
    );
}

export default withRouter(HomePage);
