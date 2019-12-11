import React, {useState} from 'react'
import PropTypes from 'prop-types';

const ExamDetails = ({exam}) => {

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
            <span className={"w3-xlarge"}>{exam.name}</span>&nbsp;
            <span className={"w3-opacity w3-small"}>{exam.description}</span>

        </div>
    )

};

ExamDetails.propTypes = {};
export default ExamDetails