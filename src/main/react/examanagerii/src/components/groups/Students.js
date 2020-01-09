import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import axios from "axios";
import Notification from "../../assets/components/Notification";
import NewStudent from "./NewStudent";
import Button from "../../assets/components/Button";
import Student from "./Student";

const Students = ({group}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [students, setStudents] = useState([]);
    const [notification, setNotification] = useState([false, "", true]);
    const [showNew, setShowNew] = useState(false);

    useEffect(() => loadStudents(), []);

    /***********
     *
     * Functions
     *
     ************/

    const loadStudents = () => {
        axios.get("api/students/byGroup/" + group.id)
            .then(res => setStudents(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden", false]))
    };

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div>
            <div>
                <span className={"w3-xlarge"}>SchülerInnen der {group.name}</span>
                <Button className={"w3-white w3-xlarge"} label={showNew ?"-" : "+"} onClick={() => setShowNew(!showNew)}/>
            </div>
            <ul className={"w3-ul"}>
                {showNew && <NewStudent group={group} update={loadStudents}/>}
                {students.map(student =>
                    <li
                        className={"animate-top"}
                        key={student.id}>
                        <Student student={student} update={loadStudents}/>
                    </li>
                )}
            </ul>
            {notification[0] &&
                <Notification
                    notification={notification}
                    setNotification={setNotification}
                />
            }
        </div>
    )

};

Students.propTypes = {};
export default Students