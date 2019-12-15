import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import Button from "../../assets/components/Button";
import Notification from "../../assets/components/Notification";
import axios from "axios";
import TextInput from "../../assets/components/TextInput";
import GroupDetails from "../groups/GroupDetails";
import ExamDetails from "./ExamDetails";

const Exams = ({}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [showNewExam, setShowNewExam] = useState(false);
    const [exams, setExams] = useState([]);
    const [notification, setNotification] = useState([false, "", true]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => loadExams(), []);

    /***********
     *
     * Functions
     *
     ************/
    const loadExams = () => {
        axios.get("api/exams/myExams/")
            .then(res => setExams(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden", false]))
    };

    const sendExam = () => {
        axios.post("/api/exams/create", {name: name, description: description})
            .then(() => {
                setNotification([true, "Gespeichert", true]);
                setName("");
                setDescription("");
                loadExams();
            })
            .catch(() => setNotification([true, "Fehler beim Speichern", false]))
    };

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"content-wrapper animate-left"}>
            <div>
                <span className={"w3-xxlarge"}>Klausuren</span>
                <Button className={"w3-white w3-xlarge"} label={showNewExam ?"-" : "+"} onClick={() => setShowNewExam(!showNewExam)}/>
            </div>

            {showNewExam &&
                <div className={"animate-left"}>
                    <h3>Neue Klausur erstellen</h3>
                    <TextInput label={"Klausurname"} onChange={setName} value={name}/>
                    <TextInput label={"Beschreibung"} onChange={setDescription} value={description}/>
                    <Button disabled={!name.length} label={"Speichern"} onClick={sendExam}/>
                </div>
            }

            <div className={"animate-left-2"}>
                <ul className={"w3-ul"}>
                    {exams.map(exam =>
                        <li key={exam.id} className={"animate-left"}>
                            <ExamDetails exam={exam} update={loadExams}/>
                        </li>
                    )}
                </ul>
            </div>


            {notification[0] &&
                <Notification
                    notification={notification}
                    setNotification={setNotification}
                />
            }
        </div>
    )

};

Exams.propTypes = {};
export default Exams