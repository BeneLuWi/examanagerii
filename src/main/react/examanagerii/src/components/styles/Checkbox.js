import React, {useState} from 'react'
import PropTypes from 'prop-types';

const Checkbox = ({id, value, onChange}) => {

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
        <p className={"fancy"}>
            <label htmlFor={"isAdmin"} className={"fancy"}>
                <input id={"isAdmin"} type={"checkbox"}/>
                <span>Ist ein Admin</span>
            </label>
        </p>
    )

};

Checkbox.propTypes = {};
export default Checkbox