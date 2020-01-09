import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cl from "classnames";

const Button = ({label, onClick, disabled, className, nomargin, confirm}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const [showConfirm, setShowConfirm] = useState(false);

    /***********
     *
     * Functions
     *
     ************/

    const handleClick = () => {
        if (confirm) {
            setShowConfirm(true)
        } else {
            onClick();
        }
    };

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"d-inline-block"}>
            <button
                className={cl("w3-btn w3-blue", {"w3-margin": !nomargin}, className)}
                onClick={handleClick}
                disabled={disabled || showConfirm}>
                {label}
            </button>
            {showConfirm &&
                <div className={"w3-card w3-white w3-padding"} style={{position: "absolute", width: 200, top: -20}}>
                    Sicher?
                    &nbsp;
                    <button
                        className={"w3-btn w3-green w3-small"}
                        onClick={() => {onClick(); setShowConfirm(false)}}
                    >
                        Ja
                    </button>
                    &nbsp;
                    <button
                        className={"w3-btn w3-red w3-small"}
                        onClick={() => {setShowConfirm(false)}}
                    >
                        Nein
                    </button>
                </div>
            }
        </div>
    )

};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired
};
export default Button