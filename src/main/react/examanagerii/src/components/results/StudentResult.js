import React, {useState, useEffect} from 'react'
import cl from "classnames";
import Button from "../../assets/components/Button";
import NumberInput from "../../assets/components/NumberInput";
import StudentResultModal from "./StudentResultModal";

const StudentResult = ({student, exam, selectStudent, notify}) => {

    /*************
     *
     *  HOOKS
     *
     *************/
    const [showModal, setShowModal] = useState(false);

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
            <Button
                className={"w3-display-right"}
                label={"Eintragen"}
                onClick={() => setShowModal(true)}
                nomargin={true}
                disabled={!exam}
            />
            {showModal &&
                <StudentResultModal
                    student={student}
                    exam={exam}
                    close={() => setShowModal(false)}
                    notify={notify}
                />
            }
        </div>
    )

};

export default StudentResult