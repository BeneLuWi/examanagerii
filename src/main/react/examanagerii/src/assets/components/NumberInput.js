import React, {useState, useEffect} from 'react'

const NumberInput = ({min, max, label, value, setValue, index}) => {

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

    const handleChange = (val) => {
        console.log(index)
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
        <label style={{width: 30}}>
            <span className={"w3-opacity"}>{label || ""}</span>
            <input
                type={"number"}
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