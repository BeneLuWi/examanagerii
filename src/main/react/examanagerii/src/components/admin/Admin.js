import React, {useState} from 'react'
import axios from "axios";
import UserRegistration from "./UserRegistration";
import ExistingUsers from "./ExistingUsers";

const Admin = ({}) => {

    /***********
     *
     * Hook States
     *
     ************/



    /***********
     *
     * Functions
     *
     ************/


    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div>
            <UserRegistration/>
            <ExistingUsers/>
        </div>
    )

};

Admin.propTypes = {};
export default Admin