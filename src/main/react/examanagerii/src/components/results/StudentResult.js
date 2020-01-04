import React, {useState, useEffect} from 'react'
import cl from "classnames";
import Button from "../../assets/components/Button";

const StudentResult = ({student, selectStudent}) => {

    /*************
     *
     *  HOOKS
     *
     *************/


    /*************
     *
     *  FUNCTIONS
     *
     *************/


    /*************
     *
     *  RENDERING
     *
     *************/


    return (
        <div className={"w3-display-container"} style={{height: 20}}>
            <div className={"w3-display-left w3-padding"}>{student.firstname} {student.lastname}</div>
            <Button className={"w3-display-right"} label={"Eintragen"} onClick={selectStudent} margin={true}/>
        </div>
    )

};

export default StudentResult