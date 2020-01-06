import React, {useState} from 'react'
import PropTypes from 'prop-types';
import axios from "axios";
import cl from "classnames";
import Notification from "../../assets/components/Notification";
import Students from "./Students";
const GroupDetails = ({group}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [expandStudents, setExpandStudents] = useState(false);

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
        <div>
            <h4 className={cl("w3-button", {"w3-blue": expandStudents})} onClick={() => setExpandStudents(!expandStudents)}>
                {group.name}&nbsp;
                <span className={"w3-small w3-opacity"}>{group.description}</span>&nbsp;
                {expandStudents ? <span className={"w3-tiny"}>&#9650;</span> : <span className={"w3-tiny"}>&#9660;</span>}
            </h4>
            {expandStudents &&
                <Students group={group}/>
            }
        </div>
    )



};

GroupDetails.propTypes = {};
export default GroupDetails