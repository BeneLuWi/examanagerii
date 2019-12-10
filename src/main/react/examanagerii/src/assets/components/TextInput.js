import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cl from "classnames";

const TextInput = ({value, onChange, width, placeholder, label}) => {

    /***********
     *
     * Hook States
     *
     ************/

    /***********
     *
     * Functions
     *
     ************/

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <label>
            <span className={"w3-opacity"}>{label}</span>
            <input
                style={{width: width || "100%"}}
                type={"text"}
                className={cl("w3-input")}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={"Eingabe"}
            />
        </label>
    )

};

TextInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};
export default TextInput