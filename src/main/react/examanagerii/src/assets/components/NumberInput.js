import React, {useState, useEffect} from 'react'

const NumberInput = ({min, max, label, value, setValue, index, width}) => {

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

    const handleChange = (inVal) => {
        let val = parseFloat(inVal);
        if (max && val > max) val = max;
        if (min && val < min) val = min;


        index !== null ?
            setValue(val, index) :
            setValue(val)
    };

    /*************
     *
     *  RENDERING
     *
     *************/


    return (
        <label style={{width: width || 30}}>
            <span className={"w3-opacity"}>{label || ""}</span>
            <input
                onClick={(e) => e.target.select()}
                type="number"
                min={min || 0}
                max={max || 100}
                step={0.5}
                value={value}
                className={"w3-input"}
                onChange={e => handleChange(e.target.value)}
            />
        </label>
    )

};

export default NumberInput