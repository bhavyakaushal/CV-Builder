import React from "react";

/* Styles Utils */
import classnames from "classnames";

/* PropTypes */
import PropTypes from "prop-types";

/* Styles */
import "./styles.scss";

function Button({ className = "", disabled = false, children, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={classnames("standard-button", className)}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onClick: PropTypes.func
};

export default React.memo(Button);
