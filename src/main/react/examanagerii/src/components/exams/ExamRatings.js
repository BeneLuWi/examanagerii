import React, {useState, useEffect} from 'react'
import NumberInput from "../../assets/components/NumberInput";

const ExamRatings = ({ratings, setRatings}) => {

    /*************
     *
     *  HOOKS
     *
     *************/

    /*************
     *
     *  FUNCTIONS
     *
     *************/

    const handleChange = (rating, index) => {
        let newRatings = [...ratings];
        newRatings[index] = rating;
        setRatings(newRatings);
    };

    /*************
     *
     *  RENDERING
     *
     *************/


    return (
        <div className={"w3-half"}>
            <span className={"w3-xlarge"}>Notenverteilung</span>
            {ratings.map((r, index) =>
                <div className={"animate-left"}>
                    <NumberInput
                        label={`% bis ${index} MSS-Punkte`}
                        value={r}
                        index={index}
                        setValue={handleChange}
                    />
                </div>
            )}
        </div>
    )

};

export default ExamRatings