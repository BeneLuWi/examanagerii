import React, {useState} from 'react'
import PropTypes from 'prop-types';
import TextInput from "../../assets/components/TextInput";
import axios from  "axios";
import Button from "../../assets/components/Button";
import Select from "react-select";


const options = [

    {value: "MALE", label: "Männlich"},
    {value: "FEMALE", label: "Weiblich"}

];

const EditStudent = ({update, close, student}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [firstname, setFirstname] = useState(student.firstname);
    const [lastname, setLastname] = useState(student.lastname);
    const [gender, setGender] = useState(options[0]);

    /***********
     *
     * Functions
     *
     ************/

    const updateStudent = () => {
        const updateStudent = {
            firstname: firstname,
            lastname: lastname,
            gender: gender.value,
            id: student.id,
            groupId: student.groupId
        };

        axios.put("/api/students/update", updateStudent)
            .then(() => {
                update();
                close();
            })

    };

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"w3-padding w3-small animate-opacity z2"}>
            <TextInput className={"d-inline-block"} label={"Vorname"} onChange={setFirstname} value={firstname} width={"33%"}/>
            <TextInput className={"d-inline-block"} label={"Nachname"} onChange={setLastname} value={lastname} width={"33%"}/>
            <div style={{width: "33%", display:"inline-block"}}>
                <Select
                    value={gender}
                    placeholder={"Geschlecht"}
                    options={options}
                    onChange={setGender}
                />
            </div>
            <Button
                disabled={!firstname.length}
                label={"Speichern"}
                onClick={updateStudent}
            />
            <Button
                className={"w3-small w3-orange"}
                label={"Löschen"}
                onClick={() => {axios.delete("/api/students/delete/" + student.id); update();}}
                confirm={true}
            />
            <Button
                label={"Abbrechen"}
                onClick={close}
            />
        </div>
    )

};

export default EditStudent