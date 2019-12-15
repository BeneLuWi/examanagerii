import React, {useState, useEffect} from 'react'
import ExamRatings from "./ExamRatings";
import ExamExercises from "./ExamExercises";
import Button from "../../assets/components/Button";
import Notification from "../../assets/components/Notification";
import axios from "axios";

const EditExam = ({close, update, exam}) => {

    /*************
     *
     *  HOOKS
     *
     *************/

    const [name, setName] = useState(exam.name);
    const [description, setDescription] = useState(exam.description);

    const [exes, setExes] = useState(exam.exercises);
    const [ratings, setRatings] = useState(exam.ratings);

    const [notification, setNotification] = useState([false, "", true]);


    /*************
     *
     *  FUNCTIONS
     *
     *************/
    const sendGroup = () => {
        axios.put("/api/exams/update",
            {
                ...exam,
                exercises: exes,
                ratings: ratings,
            })
            .then(() => {
                setNotification([true, "Gespeichert", true]);
                setName("");
                update();
            })
            .catch(() => setNotification([true, "Fehler beim Speichern", false]))
    };
    /*************
     *
     *  RENDERING
     *
     *************/


    return (
        <div className={"w3-row-padding"}>
            <ExamRatings
                ratings={ratings}
                setRatings={setRatings}
            />
            <ExamExercises
                exes={exes}
                setExes={setExes}
                examId={exam.id}
            />
            <Button label={"Alle Änderungen Speichern"} onClick={sendGroup}/>
            {notification[0] &&
            <Notification
                notification={notification}
                setNotification={setNotification}
            />
            }

        </div>
    )

};

export default EditExam