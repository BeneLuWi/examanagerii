import React, {useState} from 'react'
import axios from "axios";
import cl from "classnames";
import Students from "./Students";
import Button from "../../assets/components/Button";
const GroupDetails = ({group, update}) => {

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
            <Button
                className={"w3-small w3-orange"}
                label={"Löschen"}
                onClick={() => {axios.delete("/api/groups/delete/" + group.id).then(update)}}
                confirm={true}
            />}
            {expandStudents &&
                <Students group={group}/>
            }
        </div>
    )



};

GroupDetails.propTypes = {};
export default GroupDetails