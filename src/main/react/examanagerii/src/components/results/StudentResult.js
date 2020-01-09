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
            {result && result.totalReached !== null ?
                <div className={"w3-display-middle"}>{result.totalReached} Punkte</div>
                :<div className={"w3-display-middle"}>Kein Ergebnis</div>
            }
            <div className={"w3-display-right"}>
                <Button
                    className={"w3-small"}
                    label={"Eintragen"}
                    onClick={() => setShowModal(true)}
                    nomargin={true}
                    disabled={!exam}
                />
                &nbsp;
                <Button
                    className={"w3-small w3-orange"}
                    label={<span>&times;</span>}
                    onClick={() => setShowModal(true)}
                    nomargin={true}
                    disabled={!result || result.totalReached === null}
                />
            </div>

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