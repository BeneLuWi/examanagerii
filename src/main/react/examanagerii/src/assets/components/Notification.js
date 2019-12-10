import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types';
import {useSpring, animated} from "react-spring";
import cl from "classnames";

const Notification = ({notification, setNotification}) => {

    /***********
     *
     * Hook States
     *
     ************/

    const props = useSpring({
        from: {
            opacity: 0,
            bottom: 0,
        },
        to: async next => {
            await next({
                opacity: 1,
                bottom: 50,

            });
            await next({
                opacity: 0,
                bottom: 0,
            })
        },
        duration: 4000,

        onRest: () => setNotification([false, "", true]),
    });

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

    console.log(notification)

    return (
        <animated.div
            style={props}
            className={cl("notification w3-card-4 w3-padding", {"w3-green": notification[2]}, {"w3-red" : !notification[2]})}>
            {notification[1]}
        </animated.div>
    )

};

Notification.propTypes = {
    notification: PropTypes.array.isRequired,
    setNotification: PropTypes.func.isRequired

};
export default Notification