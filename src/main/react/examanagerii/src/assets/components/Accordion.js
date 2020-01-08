import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cl from "classnames";

const Accordion = ({child, title, expanded = true}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [expand, setExpand] = useState(expanded);

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
            <h3 className={cl("accordion-title", {"opacity": expand})} onClick={() => setExpand(!expand)}>{title}</h3>
            <div className={cl("accordion", {"accordion-expand": expand})}>
                {child}
            </div>
            <hr/>
        </div>
    )

};

Accordion.propTypes = {};
export default Accordion