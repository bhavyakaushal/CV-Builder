import React from "react";

/* Styles */
import "./styles.scss";

/* React Router DOM */
import { Link, withRouter } from "react-router-dom";

/* Redux */
import { useDispatch } from "react-redux";
import { authActions } from "../../State/actions";

function LoginPage() {
    const dispatch = useDispatch();
    const [passwordText, setPasswordText] = React.useState("");
    const [emailText, setEmailText] = React.useState("");

    const handlePasswordChange = (e) => {
        setPasswordText(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmailText(e.target.value);
    };

    const submitForLogin = () => {
        const password_temp = passwordText.trim();
        const email_temp = emailText.trim();
        if (email_temp && password_temp) {
            dispatch(authActions.login(password_temp, email_temp));
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") submitForLogin();
    };
    return (
        <div id="login-page">
            <div className="login-container">
                <div className="h1">Sign In</div>
                <div className="mt-4 d-flex flex-column">
                    <div className="full-input mt-4">
                        <div className="full-input-label">
                            <i
                                style={{ fontSize: "14px/1" }}
                                class="fa fa-envelope"
                            ></i>
                            <label className="L1 mb-0 ml-1" for="email">
                                Email address
                            </label>
                        </div>

                        <input
                            className="L2 pl-3 mt-1"
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
                            <label className="L1 mb-0 ml-1" htmlFor="password">
                                Password
                            </label>
                        </div>
                        <input
                            className="L2 pl-3 mt-1"
                            type="password"
                            name="password"
                            value={passwordText}
                            placeholder="Enter your password here"
                            onChange={handlePasswordChange}
                            onKeyDown={onKeyDown}
                            required
                        />
                    </div>
                    <Link
                        to="/login"
                        className="mt-2 d-flex align-items-center justify-content-end"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div className="m-l-lg-140 mt-4 d-flex align-items-center">
                    <button
                        type="button"
                        class="btn btn-primary"
                        onClick={submitForLogin}
                        onKeyPress={submitForLogin}
                        disabled={!(passwordText && emailText)}
                    >
                        Sign In
                    </button>
                </div>
                <span>
                    Don't have an account yet?
                    <a href="/register">Sign Up here</a>
                </span>
            </div>
        </div>
    );
}

export default withRouter(LoginPage);
