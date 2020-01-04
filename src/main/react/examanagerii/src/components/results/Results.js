import React, {useState, useEffect} from 'react'
import cl from "classnames";
import axios from "axios";
import Notification from "../../assets/components/Notification";
import Button from "../../assets/components/Button";
import TextInput from "../../assets/components/TextInput";
import Select from "react-select";
import StudentResult from "./StudentResult";
import Statistics from "../statistics/Statistics";
import Student from "../groups/Student";
import NumberInput from "../../assets/components/NumberInput";

const Results = ({}) => {

    /*************
     *
     *  HOOKS
     *
     *************/

    const [allExams, setAllExams] = useState([]);
    const [exam, setExam] = useState(null);
    const [examOption, setExamOption] = useState(null);
    const [showExamSelect, setShowExamSelect] = useState(true);

    const [allGroups, setAllGroups] = useState([]);
    const [group, setGroup] = useState([]);
    const [groupOption, setGroupOption] = useState(null);
    const [showGroupSelect, setShowGroupSelect] = useState(true);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [notification, setNotification] = useState([false, "", true]);

    useEffect(() => {getGroups(); getExams(); getResults()}, []);

    /*************
     *
     *  FUNCTIONS
     *
     *************/

    const getGroups = () => {
        axios.get("/api/groups/myGroups")
            .then(res => setAllGroups(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Klassen"]))
    };

    const getExams = () => {
        axios.get("/api/exams/myExams")
            .then(res => setAllExams(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Klassen"]))
    };

    const sendResult = () => {
        const data = {
            studentId: selectedStudent.id,
            examId: exam.id,
            groupId: group.id,
            exercises: selectedStudent.exercises
        };

        axios.post("/api/results/create")
            .then(() => getGroup(group.id))
            .catch(() => setNotification([true, "Fehler beim Speichern"]))

    };

    const getResults = () => {
        axios.get("/api/results/myResults")
            .then(res => setAllExams(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Ergebnisse", false]))
    };

    const getGroup = (id) => {
        axios.get("/api/students/byGroup/" + id)
            .then(res => setGroup(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Klassen", false]))
    };

    const selectGroup = (opt) => {
        setGroupOption(opt);
        getGroup(opt.value);
    };

    const selectExam = (opt) => {
        setExamOption(opt);
        setExam(allExams.find(e => e.id === opt.value));
    };

    const handleStudentResultChange = (points, id) => {
        if (!selectedStudent.results.find(res => res.id === id)) {
            selectedStudent.results.push({
                id: id,
                re
            })
        }


    };

    /*************
     *
     *  RENDERING
     *
     *************/


    return (
        <div className={"content-wrapper animate-left"}>
            <div>
                <span className={"w3-xxlarge"}>Klausurergebnisse</span>
            </div>

            <div className={"animate-left"}>
                <h3>Klausurergebnisse eintragen für</h3>
                <div className={"w3-row"}>
                    <div className={"w3-half"}>
                        <Select
                            options={allGroups.map(g=> ({value: g.id, label: `${g.name}: ${g.description}`}))}
                            onChange={selectGroup}
                            value={groupOption}
                        />
                    </div>
                    <div className={"w3-half"}>
                        <Select
                            options={allExams.map(e=> ({value: e.id, label: `${e.name}: ${e.description}`}))}
                            onChange={selectExam}
                            value={examOption}
                        />
                    </div>
                </div>
            </div>

            <div className={"w3-row"}>
                <ul className={"w3-ul w3-half w3-border"}>
                    {group.map(student =>
                        <li key={student.id} className="w3-display-container">
                            <StudentResult
                                student={student}
                                result={{}}
                                selectStudent={() => setSelectedStudent(student)}
                            />
                        </li>
                    )}
                </ul>
                <ul className={"w3-ul w3-half w3-right w3-border"}>
                    {exam && exam.exercises.map(ex =>
                        <li key={ex.id}>
                            {ex.name}: {ex.reachable}
                        </li>
                    )}
                </ul>
            </div>
            {selectedStudent &&
                <div className={"w3-modal"}>
                    <div className={"w3-modal-content w3-white w3-padding "} style={{width: 500}}>
                        <h2>{selectedStudent.firstname} {selectedStudent.lastname}</h2>
                        <ul className={"w3-ul w3-border w3-white"}>
                            {exam ? exam.exercises.map(ex =>
                                <li key={ex.id} className={"w3-display-container"} style={{height: 60}}>
                                    <div className={"w3-padding w3-display-left"}>{ex.name}</div>
                                    <div className={"w3-display-middle"}>
                                        <NumberInput
                                            label={``}
                                            value={ex.reachable}
                                            setValue={() => {}}
                                        />
                                    </div>
                                    <div className={"w3-display-right w3-padding"}>/ {ex.reachable}</div>
                                </li>
                            ):
                                <li>Bitte eine Klausur auswählen</li>
                            }
                        </ul>
                        <Button disabled={!exam} label={"Speichern"} className={"w3-green"} onClick={() => setSelectedStudent(null)}/>
                        <Button label={"Abbrechen"} className={"w3-red"} onClick={() => setSelectedStudent(null)}/>
                    </div>
                </div>
            }
            {notification[0] &&
            <Notification
                notification={notification}
                setNotification={setNotification}
            />
            }
        </div>
    )

};

export default Results