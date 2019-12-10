import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cl from "classnames";

const FlatButton = ({label, onClick, disabled}) => {

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
            className={cl("w3-button w3-margin")}
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    )

};

FlatButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired
};
export default FlatButton