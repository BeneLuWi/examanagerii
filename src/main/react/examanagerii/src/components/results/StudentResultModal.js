import React, {useState, useEffect} from 'react'
import NumberInput from "../../assets/components/NumberInput";
import Button from "../../assets/components/Button";
import axios from "axios";

const StudentResultModal = ({student, exam, close, notify}) => {
    /*************
     *
     *  HOOKS
     *
     *************/

    const [result, setResult] = useState(null);
    const [exercises, setExercises] = useState(null);

    useEffect(() => {
        getResult();
    }, []);


    /*************
     *
     *  FUNCTIONS
     *
     *************/

    const getResult = () => {
        axios.get(`/api/results/forStudent/${student.id}/${exam.id}/${student.groupId}`)
            .then(res => {
                setResult(res.data);
                setExercises(res.data.exercises);
            })
            .catch(err => console.log(err));
    };

    const saveResult = () => {
        const data = {
            ...result,
            exercises: exercises
        };

        axios.put("api/results/save", data)
            .then(() => {
                close();
                notify([true, "Gespeichert", true]);
            })
            .catch(() => notify([true, "Fehler beim Speichern"]));
    };

    const handleResultChange = (value, index) => {
        let newExercises = [...exercises];
        newExercises[index].reached = value;
        setExercises(newExercises);
    };

    const numOr0 = (n) => isNaN(n) ? 0 : n;

    /*************
     *
     *  RENDERING
     *
     *************/


    return (
        <div className={"w3-modal"}>
            <div className={"w3-modal-content w3-white w3-padding animate-zoom"} style={{width: 500}}>
                <h2>{student.firstname} {student.lastname}</h2>
                {exercises ?
                    <ul className={"w3-ul w3-border w3-white"}>
                        {exercises.map((ex, index) =>
                            <li key={ex.id} className={"w3-display-container"} style={{height: 60}}>
                                <div className={"w3-padding w3-display-left"}>{ex.name}</div>
                                <div className={"w3-display-middle"}>
                                    <NumberInput
                                        label={``}
                                        value={ex.reached}
                                        setValue={handleResultChange}
                                        index={index}
                                        max={ex.reachable}
                                    />
                                </div>
                                <div className={"w3-display-right w3-padding"}>/ {ex.reachable}</div>
                            </li>
                        )}
                        <li className={"w3-display-container"} style={{height: 60}}>
                            <div className={"w3-padding w3-display-left"}>Gesamt</div>
                            <div className={"w3-display-middle"}>
                                {exercises.reduce((a, b) =>
                                    ({reached: numOr0(a.reached) + numOr0(b.reached)})).reached}
                            </div>
                            <div className={"w3-display-right w3-padding"}>
                                / {exercises.reduce((a, b) =>
                                ({reachable: numOr0(a.reachable) + numOr0(b.reachable)})).reachable}
                            </div>
                        </li>
                    </ul>:
                    <div>Bitte eine Klausur auswählen</div>
                }
                <Button disabled={!exam} label={"Speichern"} className={"w3-green"} onClick={saveResult}/>
                <Button label={"Abbrechen"} className={"w3-red"} onClick={close}/>
            </div>
        </div>
    )

};

export default StudentResultModal