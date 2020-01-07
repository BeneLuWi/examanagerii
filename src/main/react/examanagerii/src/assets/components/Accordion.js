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
        <div className={"accordion-wrapper"}>
            <h2 onClick={() => setExpand(!expand)}>{title}</h2>
            <div className={cl("accordion", {"accordion-expand": expand})}>
                {child}
            </div>
        </div>
    )

};

Accordion.propTypes = {};
export default Accordion