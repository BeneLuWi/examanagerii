import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cl from "classnames";

const Button = ({label, onClick, disabled, className, nomargin}) => {

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
        <button
            className={cl("w3-btn w3-blue", {"w3-margin": !nomargin}, className)}
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    )

};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired
};
export default Button