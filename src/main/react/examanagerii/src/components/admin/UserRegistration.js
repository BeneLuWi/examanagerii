import React, {useState} from 'react'
import axios from "axios";

const UserRegistration = ({}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[isAdmin, setIsAdmin]= useState(false);

    const[users, setUsers] = useState([]);

    /***********
     *
     * Functions
     *
     ************/

    const createUser = () => {
        const newUser = {
            username: username,
            password: password,
            role: isAdmin ? "ROLE_ADMIN": "ROLE_USER"
        };

        axios.put("/api/user/create", newUser)
            .then(() => {
                setUsers([...users, newUser]);
                setUsername("");
                setPassword("");
            })
            .catch(err => alert("Fehler beim senden: " + err))
    };

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"w3-container w3-card"} style={{width: 500, minHeight: 200, margin: "auto"}}>
            <div>
                <input
                    className={"w3-input"}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder={"Username"}
                />
                <input
                    className={"w3-input"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={"Password"}
                />
                <p className={"fancy"}>
                    <label htmlFor={"isAdmin"} className={"fancy"}>
                        <input
                            id={"isAdmin"}
                            type={"checkbox"}
                            onClick={() => setIsAdmin(!isAdmin)}
                            value={isAdmin}
                        />
                        <span>Ist ein Admin</span>
                    </label>
                </p>

                <button
                    className={"w3-btn green"}
                    onClick={createUser}>
                    Speichern
                </button>
            </div>
            <h4>Erstellte Nutzer:</h4>
            <ul className={"w3-ul"}>
                {users.map(user =>
                    <li key={user.username}>
                        Name: {user.username}<br/>
                        Passwort: {user.password}<br/>
                        Berechtigung: {user.role}
                    </li>
                )}
            </ul>
        </div>
    )

};

export default UserRegistration