import React from "react";

import classnames from "classnames";

/* ProTypes */
import PropTypes from "prop-types";

/* Redux */
import { useDispatch, useSelector } from "react-redux";

/* Styles */
import "./styles.scss";

/* Material UI */
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";

/* Images/SVG */
import { ReactComponent as SearchSVG } from "../../../../Assets/SVG/search.svg";

const useStyles = makeStyles(() => ({
    icon_root: {
        color: "rgb(212, 65, 39)",
        height: 26,
        width: 24
    },
    custom__autocomplete: {
        minWidth: "200px",
        backgroundColor: "#FFFFFF",
        padding: "0.2rem 0.5rem",
        boxShadow: "0px 0px 11px #91919112",
        border: "1px solid #e0e0e0",
        borderRadius: "5px",
        width: "100%"
    },
    custom__list__box: {
        paddingBottom: "unset"
    },
    custom__autocomplete_inputRoot: {
        fontSize: 18
    },
    search__bar__history: {
        cursor: "pointer",
        borderBottom: "2px solid #eee",
        padding: "8px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "& .search__bar__history__img": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fe4d01",
            fill: "#fff",
            borderRadius: "100%",
            padding: "4px",
            width: "20px",
            height: "20px",
            alignSelf: "center",
            flexGrow: "0",
            flexShrink: "0",
            marginRight: "8px"
        },

        "& p": {
            fontSize: "14px",
            flexGrow: 1,
            flexShrink: 1,
            marginBottom: 0
        },
        "& small": {
            fontSize: ".7rem",
            fontWeight: "bolder",
            fontFamily: "cursive"
        },

        "&:hover": {
            backgroundColor: "rgba(218,224,225,0.4) !important"
        }
    }
}));

function SearchBar({ fetching_main_content_redux }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    // eslint-disable-next-line
    const [option_text, set_option_text] = React.useState(null);
    const [on_search_open, set_on_search_open] = React.useState(false);
    const [search_text, set_search_text] = React.useState("");

    const helper_options_redux = ["a", "b", "c"];
    //     (state) => state.data.helper_options
    // );

    const request_content_text = (status) => {
        // dispatch(dataActions.getTextSearchData({ status: status }));
    };

    const getInputOption = (input_temp) => {
        // dispatch(dataActions.getInputSearch({ text: input_temp }));
    };

    const handleSubmit = (data) => {
        if (search_text !== "") {
            request_content_text(search_text);
            set_on_search_open(false);
        }
        if (data.search_text != null) {
            set_search_text(data?.search_text);
        }
    };

    const handleOptionText = (e, newInputValue) => {
        if (newInputValue?.status) {
            set_search_text(newInputValue.status);
            request_content_text(newInputValue.status);
        }
    };

    const handleInputSearch = (e, newInputValue) => {
        set_search_text(newInputValue);
        getInputOption(newInputValue);
    };

    const handleKeyDown = (e) => {
        set_on_search_open(true);
        if (e.keyCode === 13 || e.code === "Enter" || e.search_text) {
            handleSubmit(e);
            set_on_search_open(false);
        }
    };

    React.useEffect(() => {
        if (helper_options_redux && helper_options_redux.length === 0)
            getInputOption("");

        // eslint-disable-next-line
    }, []);

    return (
        <div className="ml-1 flex-grow-1 d-flex align-items-center justify-content-center">
            <Autocomplete
                disabled={false}
                value={option_text}
                onChange={handleOptionText}
                inputValue={search_text}
                onInputChange={handleInputSearch}
                clearOnBlur={false}
                options={helper_options_redux}
                open={on_search_open}
                onOpen={() => set_on_search_open(true)}
                getOptionLabel={(option) => option.status}
                onKeyDown={handleKeyDown}
                noOptionsText={"No Search History Found"}
                renderOption={(params, data) => {
                    return (
                        <div
                            {...params}
                            className={classes.search__bar__history}
                        >
                            <div className="d-flex py-1 justify-content-center align-items-baseline">
                                <div className="search__bar__history__img">
                                    <SearchSVG />
                                </div>
                                <p>{data.status}</p>
                            </div>
                            <small>{data.TIME_STAMP} ago</small>
                        </div>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        name="search_concept"
                        placeholder="Search Topic"
                        variant="standard"
                        value={search_text}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true
                        }}
                        size="small"
                        id="outlined-required"
                        disableUnderline={true}
                    />
                )}
                classes={{
                    root: classes.custom__autocomplete,
                    inputRoot: classes.custom__autocomplete_inputRoot,
                    listbox: classes.custom__list__box
                }}
            />
        </div>
    );
}

SearchBar.propTypes = {
    fetching_main_content_redux: PropTypes.bool
};

export default React.memo(SearchBar);
