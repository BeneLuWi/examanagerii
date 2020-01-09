import React, {useState, useEffect} from 'react'
import Button from "../../assets/components/Button";
import StudentResultModal from "./StudentResultModal";
import axios from "axios";

const StudentResult = ({student, exam, result, notify, update}) => {

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
                {result &&
                    <Button
                        className={"w3-small w3-orange"}
                        label={<span>&times;</span>}
                        onClick={() => {axios.delete("/api/results/delete/" + result.id).then(update)}}
                        nomargin={true}
                        confirm={true}
                        disabled={!result || result.totalReached === null}
                    />
                }
            </div>

            {showModal &&
                <StudentResultModal
                    student={student}
                    exam={exam}
                    close={() => {setShowModal(false); update();}}
                    notify={notify}
                />
            }
        </div>
    )

};

export default StudentResult