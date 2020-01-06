import React, {useState} from 'react'
import PropTypes from 'prop-types';

const Accordion = ({child}) => {

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
        <div className={"accordion-wrapper"}>
            {child}
        </div>
    )

};

Accordion.propTypes = {};
export default Accordion