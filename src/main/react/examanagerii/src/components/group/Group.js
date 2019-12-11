import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import TextInput from "../../assets/components/TextInput";
import Button from "../../assets/components/Button";
import Notification from "../../assets/components/Notification";
import axios from "axios";
import GroupDetails from "./GroupDetails";

const Group = ({}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [groups, setGroups] = useState([]);
    const [name, setName] = useState("");
    const [notification, setNotification] = useState([false, "", true]);

    const [showNewGroup, setShowNewGroup] = useState(false)

    useEffect(() => loadGroups(), []);

    /***********
     *
     * Functions
     *
     ************/

    const sendGroup = () => {
        axios.post("/api/groups/create", {name: name})
            .then(() => {
                setNotification([true, "Gespeichert", true]);
                setName("");
                loadGroups();
            })
            .catch(() => setNotification([true, "Fehler beim Speichern", false]))
    };

    const loadGroups = () => {
        axios.get("/api/groups/myGroups")
            .then(res => setGroups(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Klassen", false]))
    };


    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"content-wrapper animate-left"}>
            <div>
                <span className={"w3-xxlarge"}>Klassen</span>
                <Button className={"w3-white w3-xlarge"} label={showNewGroup ?"-" : "+"} onClick={() => setShowNewGroup(!showNewGroup)}/>
            </div>
            {showNewGroup &&
                <div className={"animate-left"}>
                    <h3>Neue Klasse erstellen</h3>
                    <TextInput label={"Klassenname"} onChange={setName} value={name}/>
                    <Button disabled={!name.length} label={"Speichern"} onClick={sendGroup}/>
                </div>
            }

            <div className={"animate-left-2"}>

                <ul className={"w3-ul"}>
                    {groups.map(group =>
                        <li key={group.id} className={"animate-left"}>
                            <GroupDetails group={group}/>
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