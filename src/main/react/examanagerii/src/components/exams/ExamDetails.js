import React, {useState} from 'react'
import cl from "classnames";
import EditExam from "./EditExam";
import Button from "../../assets/components/Button";
import axios from "axios";

const ExamDetails = ({exam, update}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [expandDetails, setExpandDetails] = useState(false);
    const [expandEdit, setExpandEdit] = useState(false);

    /***********
     *
     * Functions
     *
     ************/

    const toggleAll = () => {
        if (expandEdit || expandDetails) {
            setExpandEdit(false);
            setExpandDetails(false);
        } else {
            setExpandEdit(false);
            setExpandDetails(true);
        }
    };

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div>
            <div className={"w3-row"}>
                <h4 className={cl("w3-button")} onClick={toggleAll}>
                    <span className={"w3-xlarge"}>{exam.name}</span>&nbsp;
                    <span className={"w3-opacity w3-small"}>{exam.description}</span>&nbsp;
                    {expandDetails || expandEdit ? <span className={"w3-tiny"}>&#9650;</span> : <span className={"w3-tiny"}>&#9660;</span>}
                </h4>
                {<Button label={"Bearbeiten"} onClick={() => {setExpandEdit(!expandEdit); setExpandDetails(false)}}/>}
                {<Button label={"Details anzeigen"} onClick={() => {setExpandDetails(!expandDetails); setExpandEdit(false)}}/>}
                {expandEdit &&
                <Button
                    className={"w3-small w3-orange"}
                    label={"Löschen"}
                    onClick={() => {axios.delete("/api/exams/delete/" + exam.id).then(update)}}
                    confirm={true}
                />}
            </div>
            {expandDetails &&
                <div className={"w3-row-padding"}>
                    <div className={"w3-half "}>
                        <div>Notenverteilung</div>
                        <ul className={"w3-ul w3-border  animate-left"}>
                            {exam.ratings.map((r, index) =>
                                <li>
                                    min. <span className={"w3-large"}>{r}%</span> für {index + 1} Punkte
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={"w3-half"}>
                        <div>Aufgaben und Punkte</div>
                        <ul className={"w3-ul w3-border animate-left-2"}>
                            {exam.exercises.map((ex, index) =>
                                <li>
                                    {ex.name}: <span className={"w3-large"}>{ex.reachable}</span> Punkte
                                </li>
                            )}
                            <li>Gesamt: <span className={"w3-large"}>{exam.reachable}</span> Punkte</li>
                        </ul>
                    </div>
                </div>
            }
            {expandEdit &&
                <EditExam
                    update={update}
                    close={() => setExpandDetails(false)}
                    exam={exam}
                />
            }


        </div>
    )

};

ExamDetails.propTypes = {};
export default ExamDetails