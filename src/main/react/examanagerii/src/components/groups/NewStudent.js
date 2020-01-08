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

const NewStudent = ({group, update}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState(options[0]);

    /***********
     *
     * Functions
     *
     ************/

    const createStudent = () => {
        const student = {
            firstname: firstname,
            lastname: lastname,
            gender: gender.value,
            groupId: group.id,
        };

        axios.post("/api/students/create", student)
            .then(() => {
                update();
                setFirstname("");
                setLastname("");
            })

    };

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"w3-padding w3-small animate-left z2"}>
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
                onClick={createStudent}
            />
        </div>
    )

};

NewStudent.propTypes = {};
export default NewStudent