import React, {useState} from 'react'
import PropTypes from 'prop-types';
import EditStudent from "./EditStudent";

const Student = ({student, update}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [edit, setEdit] = useState(false);

    /***********
     *
     * Functions
     *
     ************/

    const genderToWord = (g) => g === "MALE"? "m" : g === "FEMALE" ? "w" : "d";

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div>
            {edit
            ? <EditStudent student={student} update={update} close={() => setEdit(false)}/>
            :
                <div onClick={() => setEdit(true)}>
                    {student.firstname} {student.lastname}, {genderToWord(student.gender)}
                </div>
            }
        </div>
    )

};

Student.propTypes = {};
export default Student