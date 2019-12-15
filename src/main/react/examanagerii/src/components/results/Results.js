import React, {useState, useEffect} from 'react'

import axios from "axios";
import Notification from "../../assets/components/Notification";
import Button from "../../assets/components/Button";
import TextInput from "../../assets/components/TextInput";
import Select from "react-select";

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

    const [showNewResults, setShowNewResults] = useState(false);
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
        axios.post("/api/results/create")

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
                <ul className={"w3-ul w3-half"}>
                    {group.map(student =>
                        <li key={student.id}>
                            {student.firstname} {student.lastname}
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

export default Results