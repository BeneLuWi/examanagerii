import React, {useState, useEffect} from 'react'
import TextInput from "../../assets/components/TextInput";
import Button from "../../assets/components/Button";
import NumberInput from "../../assets/components/NumberInput";

const ExamExercises = ({exes, setExes, examId}) => {

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
    const handleChange = (exe, index) => {
        let newExes = [...exes];
        newExes[index] = exe;
        setExes(newExes);
    };

    const addExe = () => {
        setExes([...exes, {name: `Aufgabe ${exes.length + 1}`, id: `${examId}-${exes.length}`, reachable: 0}])
    };

    const removeExe = (index) => {
        let newExes = [...exes];
        newExes.splice(index, 1);
        setExes(newExes);
    };

    const handleNameChange = (val, index) => {
        let exe = exes[index];
        exe.name = val;
        handleChange(exe, index);
    };

    const handleReachableChange = (val, index) => {
        let exe = exes[index];
        exe.reachable = val;
        handleChange(exe, index);
    };

    /*************
     *
     *  RENDERING
     *
     *************/


    return (
        <div className={"w3-half"}>
            <div>
                <span className={"w3-large"}>Aufgaben</span>
                <Button className={"w3-white w3-large"} label={"+"} onClick={addExe}/>
            </div>
            {exes.map((ex, index) =>
                <div key={ex.id} className={"animate-left-2"}>
                    <TextInput
                        label={"Bezeichnung"}
                        onChange={val => handleNameChange(val, index)}
                        value={ex.name}
                    />
                    <NumberInput
                        label={"Punkte"}
                        setValue={val => handleReachableChange(val, index)}
                        value={ex.reachable}
                    />
                    <Button className={"w3-red"} label={"Löschen"} onClick={() => removeExe(index)}/>
                </div>
            )}
        </div>
    )

};

export default ExamExercises