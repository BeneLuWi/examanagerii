import React, {useState, useEffect} from 'react'
import cl from "classnames";
import Button from "../../assets/components/Button";
import NumberInput from "../../assets/components/NumberInput";
import StudentResultModal from "./StudentResultModal";

const StudentResult = ({student, exam, result, notify}) => {

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
        <div className={"w3-display-container w3-padding"} style={{height: 30}}>
            <div className={"w3-display-left"}>{student.firstname} {student.lastname}</div>
            {result && result.totalReached ?
                <div className={"w3-display-middle"}>{result.totalReached} Punkte</div>
                :<div className={"w3-display-middle"}>Kein Ergebnis</div>
            }
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