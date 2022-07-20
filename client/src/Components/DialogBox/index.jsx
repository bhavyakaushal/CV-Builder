import React from "react";

import classnames from "classnames";

import PropTypes from "prop-types";

/* Material UI */
import MuiDialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";

/* Components */
import Button from "../Button";

/* Images/SVG */
import { ReactComponent as CloseSVG } from "../../Assets/SVG/close.svg";

const useStyles = makeStyles(() => ({
    custom_dialog_paperScrollPaper: {
        height: "100%"
    },
    custom_dialog: {
        borderRadius: 16,
        minHeight: "450px",
        maxWidth: "700px",
        boxShadow: "0px 6px 16px 4px rgba(0, 0, 0, 0.25041)"
    },
    custom_dialog_title_root: {
        fontSize: "20px",
        border: "none",
        padding: "36px 45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },

    custom_dialog_content_root: {
        display: "flex",
        flexDirection: "column",
        padding: "24px 24px",
        border: "none"
    },
    custom_dialog_actions_root: {
        paddingLeft: 40,
        paddingRight: 40,
        height: 60,
        padding: "60px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

const DialogTitle = React.memo(({ title, handleClose, ...props }) => {
    const classes = useStyles();

    return (
        <MuiDialogTitle
            {...props}
            disabletypography={"true"}
            classes={{
                root: classes.custom_dialog_title_root
            }}
        >
            <div className="h1 mb-0">{title}</div>
            {handleClose && (
                <IconButton aria-label="close" onClick={handleClose}>
                    <CloseSVG />
                </IconButton>
            )}
        </MuiDialogTitle>
    );
});

const DialogContent = React.memo(({ children, ...props }) => {
    const classes = useStyles();

    return (
        <MuiDialogContent
            {...props}
            dividers
            classes={{ root: classes.custom_dialog_content_root }}
        >
            {children}
        </MuiDialogContent>
    );
});

const DialogActions = React.memo(({ children, ...props }) => {
    const classes = useStyles();

    return (
        <MuiDialogActions
            {...props}
            classes={{
                root: classes.custom_dialog_actions_root
            }}
        >
            {children}
        </MuiDialogActions>
    );
});

const DialogBox = React.memo(
    ({
        open,
        title,
        className = "",
        handleClose,
        submitText = "Submit",
        submitDisabled = false,
        onSubmitFunc,
        fullHeight = false,
        maxWidth = "md",
        classesStyles = {},
        children,
        ...props
    }) => {
        const classes = useStyles();
        console.log("submit - ", submitDisabled);
        const handleOnSubmitFunc = (e) => {
            if (e.type === "click" || e.code === "Enter") {
                onSubmitFunc();
                handleClose();
            }
        };

        let classes_var = {
            paper: classes.custom_dialog
        };

        if (fullHeight) {
            classes_var = {
                ...classes_var,
                paperScrollPaper: classes.custom_dialog_paperScrollPaper
            };
        }

        return (
            <MuiDialog
                {...props}
                open={open}
                maxWidth={maxWidth}
                onClose={handleClose}
                classes={{ ...classes_var, ...classesStyles }}
                fullWidth={true}
            >
                <DialogTitle handleClose={handleClose} title={title} />
                <DialogContent
                    onKeyDown={handleOnSubmitFunc}
                    className={classnames(className)}
                >
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleOnSubmitFunc}
                        disabled={submitDisabled}
                        // onKeyPress={saveUpdatedData}
                    >
                        {submitText}
                    </Button>
                </DialogActions>
            </MuiDialog>
        );
    }
);

DialogBox.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    submitText: PropTypes.string,
    submitDisabled: PropTypes.bool,
    onSubmitFunc: PropTypes.func.isRequired,
    fullHeight: PropTypes.bool,
    maxWidth: PropTypes.string,
    classesStyles: PropTypes.object
};

export { DialogBox, DialogTitle, DialogContent, DialogActions };
