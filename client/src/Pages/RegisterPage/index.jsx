import React from "react";

/* Styles */
import "./styles.scss";

/* Global Components */
import Button from "../../Components/Button";

/* React Router DOM */
import { Link, withRouter, useHistory } from "react-router-dom";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../State/actions";

function RegisterPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newPasswordText, setNewPasswordText] = React.useState("");
    const [usernameText, setUsernameText] = React.useState("");
    const [passwordText, setPasswordText] = React.useState("");
    const [emailText, setEmailText] = React.useState("");

    const registerError_redux = useSelector((state) => state?.auth?.error);

    const handlePasswordChange = (e) => {
        setPasswordText(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPasswordText(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmailText(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsernameText(e.target.value);
    };

    const checkDisabled = () => {
        if (
            !(emailText && passwordText && usernameText && newPasswordText) ||
            passwordText !== newPasswordText ||
            !isValidEmail(emailText)
        ) {
            return true;
        } else {
            return false;
        }
    };

    const isValidEmail = (email) => {
        return email &&
            new RegExp(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
            ).test(email)
            ? true
            : false;
    };

    const submitForRegister = () => {
        const password_temp = passwordText.trim();
        const email_temp = emailText.trim();
        const username_temp = usernameText.trim();
        if (!checkDisabled()) {
            dispatch(
                authActions.register(username_temp, password_temp, email_temp)
            );
            history.push("/");
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") submitForRegister();
    };

    return (
        <div id="register-page">
            <div className="register-container">
                <div className="h1 mb-2">Sign Up</div>
                {registerError_redux && (
                    <p className="text-danger">
                        ERROR - &nbsp;
                        {registerError_redux.message
                            ? registerError_redux.message
                            : registerError_redux}
                    </p>
                )}
                <div className="mt-2 d-flex flex-column">
                    <div className="full-input mt-4">
                        <div className="full-input-label">
                            <i
                                style={{ fontSize: "20px" }}
                                class="fa fa-user"
                            ></i>
                            <label className="L1 mb-0 ml-2" for="username">
                                Username
                            </label>
                        </div>
                        <input
                            className="L2 pl-4 mt-1"
                            type="text"
                            name="username"
                            value={usernameText}
                            placeholder="Enter your username here"
                            onChange={handleUsernameChange}
                            required
                        ></input>
                    </div>
                    <div className="full-input mt-4">
                        <div className="full-input-label">
                            <i
                                style={{ fontSize: "14px/1" }}
                                class="fa fa-envelope"
                            ></i>
                            <label className="L1 mb-0 ml-2" for="email">
                                Email address
                            </label>
                        </div>

                        <input
                            className="L2 pl-4 mt-1"
                            type="email"
                            name="email"
                            value={emailText}
                            placeholder="Enter your email address here"
                            onChange={handleEmailChange}
                            required
                        ></input>
                    </div>
                    <div className="full-input mt-4">
                        <div className="full-input-label">
                            <i
                                style={{ fontSize: "14px/1" }}
                                class="fa fa-key icon"
                            ></i>
                            <label className="L1 mb-0 ml-2" htmlFor="password">
                                Password
                            </label>
                        </div>
                        <input
                            className="L2 pl-4 mt-1"
                            type="password"
                            name="password"
                            value={passwordText}
                            placeholder="Enter your password here"
                            onChange={handlePasswordChange}
                            onKeyDown={onKeyDown}
                            required
                        />
                    </div>
                    <div className="full-input mt-4">
                        <div className="full-input-label">
                            <i
                                style={{ fontSize: "14px/1" }}
                                class="fa fa-key icon"
                            ></i>
                            <label className="L1 mb-0 ml-2" htmlFor="password">
                                Password
                            </label>
                        </div>
                        <input
                            className="L2 pl-4 mt-1"
                            type="password"
                            name="password"
                            value={newPasswordText}
                            placeholder="Re-Enter your password here"
                            onChange={handleNewPasswordChange}
                            onKeyDown={onKeyDown}
                            required
                        />
                    </div>
                </div>
                <div className="m-l-lg-140 d-flex align-items-center">
                    <Button
                        className="mr-3"
                        onClick={submitForRegister}
                        onKeyPress={submitForRegister}
                        disabled={checkDisabled()}
                    >
                        Sign Up
                    </Button>
                </div>
                <span className="L2">
                    Already have an account?
                    <Link className="ml-1 footer-link" to="/">
                        Sign In here
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default withRouter(RegisterPage);
