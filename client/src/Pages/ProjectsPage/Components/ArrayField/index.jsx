import React from "react";

/* Styles */
import "./styles.scss";

/* Images/SVG */
import { ReactComponent as OutlinedCircleSVG } from "../../../../Assets/SVG/plus.svg";

const AddValueBtn = ({ addValueToList }) => {
    const [value, setValue] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) addValueToList(value);
        setValue("");
    };

    return (
        <div className="add_value_div">
            <OutlinedCircleSVG
                className="add_value_btn mr-2"
                onClick={handleSubmit}
            />
            <input
                type="text"
                value={value}
                placeholder="Enter project skills"
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

function ArrayField({ setSkillsData }) {
    const [arrValues, setArrValue] = React.useState([]);

    const addValueToList = (newValue) => {
        let ifExits = arrValues.find((temp, i) => temp === newValue);
        if (!ifExits) setArrValue((oldValue) => [...oldValue, newValue]);
    };

    React.useEffect(() => {
        if (arrValues && arrValues.length > 0) setSkillsData(arrValues);
        // eslint-disable-next-line
    }, [arrValues]);

    return (
        <div className="d-flex flex-row align-items-center array_list_wrapper">
            <AddValueBtn addValueToList={addValueToList} />
            <div className="list">
                {arrValues.map((value, index) => (
                    <div key={value} className="list_item mr-2">
                        <span className="array_list_text">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default React.memo(ArrayField);
