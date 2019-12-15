import React, {useState, useEffect} from 'react'
import cl from "classnames";

const StudentResult = ({student}) => {

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
        <div>
            {student.firstname} {student.lastname}
            <span className={cl("w3-display-right w3-button")}>Test</span>
            <StudentResult/>
        </div>
    )

};

export default StudentResult