import React, {useState, useEffect} from 'react'
import axios from "axios";
import Notification from "../../assets/components/Notification";
import Select from "react-select";
import StudentResult from "./StudentResult";

const Results = ({}) => {

    /*************
     *
     *  HOOKS
     *
     *************/

    const [allExams, setAllExams] = useState([]);
    const [exam, setExam] = useState(null);
    const [examOption, setExamOption] = useState(null);

    const [allGroups, setAllGroups] = useState([]);
    const [group, setGroup] = useState([]);
    const [groupOption, setGroupOption] = useState(null);

    const [studentReachedPoints, setStudentReachedPoints] = useState(null);

    const [notification, setNotification] = useState([false, "", true]);

    useEffect(() => {getGroups(); getExams();}, []);

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

    const getGroup = (groupId, examId) => {
        if (!examId)
            axios.get("/api/students/byGroupAsResult/" + groupId)
                .then(res => setGroup(res.data))
                .catch(() => setNotification([true, "Fehler beim Laden der Klassen", false]))
        else
            axios.get("/api/students/byGroupWithResult/" + groupId + "/" + examId)
                .then(res => setGroup(res.data))
                .catch(() => setNotification([true, "Fehler beim Laden der Klassen", false]))
    };

    const selectGroup = (opt) => {
        setGroupOption(opt);
        getGroup(opt.value, exam ? exam.id: null);
    };

    const selectExam = (opt) => {
        setExamOption(opt);
        group && getGroup(groupOption.value, opt.value);
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

            <div className={"animate-left z2"}>
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
                <ul className={"w3-ul w3-half w3-border w3-margin-top"}>
                    {group.map(studentResult =>
                        <li key={studentResult.student.id}>
                            <StudentResult
                                student={studentResult.student}
                                result={studentResult.result}
                                exam={exam}
                                notify={setNotification}
                            />
                        </li>
                    )}
                </ul>
                <ul className={"w3-ul w3-half w3-right w3-border w3-margin-top"}>
                    {exam && exam.exercises.map(ex =>
                        <li key={ex.id}>
                            {ex.name}: <span className={"w3-large"}>{ex.reachable}</span> Punkte
                        </li>
                    )}
                    {exam &&
                        <li>Gesamt: <span className={"w3-large"}>{exam.reachable}</span> Punkte</li>
                    }
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