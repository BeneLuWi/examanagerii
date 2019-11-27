import React, {useState, useEffect} from 'react'
import axios from "axios";

const ExistingUsers = ({}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const[users, setUsers] = useState([]);

    useEffect(() => {

        getUsers();

    }, []);

    /***********
     *
     * Functions
     *
     ************/

    const getUsers = () =>
        axios.get("/api/user/getAll")
            .then(res => setUsers(res.data))
            .catch(err => alert(err));

    const deleteUser = (username) =>
        axios.delete("/api/user/delete/" + username)
            .then(res => setUsers(res.data))
            .catch(err => alert(err));

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"w3-container w3-card w3-margin-top"} style={{width: 500, minHeight: 200, margin: "auto"}}>
            <button onClick={() => getUsers()} className={"w3-button w3-small"}>Aktualisieren</button>
            <ul className={"w3-ul"}>
                {users.map(user =>
                    <li key={user.username}>
                        {user.username}
                        <button
                            className={"w3-button w3-small w3-right"}
                            onClick={() => deleteUser(user.username)}>
                            Löschen
                        </button>
                    </li>
                )}

            </ul>
        </div>
    )

};

export default ExistingUsers