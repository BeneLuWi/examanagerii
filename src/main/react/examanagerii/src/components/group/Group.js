import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import TextInput from "../../assets/components/TextInput";
import Button from "../../assets/components/Button";
import Notification from "../../assets/components/Notification";
import axios from "axios";

const Group = ({}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [groups, setGroups] = useState([]);
    const [name, setName] = useState("");
    const [notification, setNotification] = useState([false, "", true]);

    useEffect(() => loadGroups(), []);

    /***********
     *
     * Functions
     *
     ************/

    const sendGroup = () => {
        axios.post("/api/group/create", {name: name})
            .then(() => {
                setNotification([true, "Gespeichert", true]);
                setName("");
                loadGroups();
            })
            .catch(() => setNotification([true, "Fehler beim Speichern", false]))
    };

    const loadGroups = () => {
        axios.get("/api/group/myGroups")
            .then(res => setGroups(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden", false]))
    };


    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"content-wrapper animate-left"}>
            <h2>Klassen</h2>

            <div className={"animate-left-2"}>
                <h3>Neue Klasse erstellen</h3>
                <TextInput label={"Klassenname"} onChange={setName} value={name}/>
                <Button label={"Speichern"} onClick={sendGroup}/>
            </div>


            <div className={"animate-left-2"}>
                <h3>Meine Klassen</h3>
                <ul className={"w3-ul"}>
                    {groups.map(group =>
                        <li key={group.id} className={"animate-left"}>
                            {group.name}
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

Group.propTypes = {};
export default Group