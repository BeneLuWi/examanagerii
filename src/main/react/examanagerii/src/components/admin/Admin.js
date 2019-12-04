import React, {useState} from 'react'
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
        <div className={"h100"}>
            <UserRegistration/>
            <ExistingUsers/>
        </div>
    )

};

Admin.propTypes = {};
export default Admin