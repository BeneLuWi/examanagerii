import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cl from "classnames";

const Accordion = ({child, title}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [expand, setExpand] = useState(true);

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
        <div className={"accordion-wrapper w3-margin-top"}>
            <h3 onClick={() => setExpand(!expand)}>{title}</h3>
            <div className={cl("accordion", {"accordion-expand": expand})}>
                {child}
            </div>
        </div>
    )

};

Accordion.propTypes = {};
export default Accordion