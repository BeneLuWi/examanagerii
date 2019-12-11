import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cl from "classnames";

const TextInput = ({value, onChange, width, className, label}) => {

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
        <label className={className || ""} style={{width: width || "100%"}}>
            <span className={"w3-opacity"}>{label}</span>
            <input
                type={"text"}
                className={cl("w3-input")}
                value={value}
                onChange={e => onChange(e.target.value)}
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