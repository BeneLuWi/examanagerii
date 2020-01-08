import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Pie, Bar, HorizontalBar} from "react-chartjs-2"

const Overview = ({statistics}) => {

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
            <div className={"w3-row-padding"}>
                <div className={"w3-third"}>
                    <h4>Konstellation</h4>
                </div>
                <div className={"w3-third"}>
                    <h4>Noten</h4>
                </div>
                <div className={"w3-third"}>
                    <h4>Erreichte Punkte</h4>
                </div>
            </div>
            <div className={"w3-row-padding"}>
                <div className={"w3-third"}>
                    <Pie
                        data={{
                            labels: ["Mädchen", "Jungen"],
                            datasets:[{
                                label:"Klassenanteil",
                                data: [statistics.studentsFemale,statistics.studentsMale],
                                backgroundColor: [
                                    '#ff2549',
                                    '#36A2EB'
                                ]
                            }]
                        }}
                    />
                </div>
                <div className={"w3-third"}>
                    <Bar
                        data={{
                            labels: ["Gesamt", "Mädchen", "Jungen"],
                            datasets: [{
                                label:"Durchschnittsnoten (MSS-Punkte)",
                                data: [statistics.avgGradeTotal, statistics.avgGradeFemale, statistics.avgGradeMale],
                                backgroundColor: [
                                    '#278500',
                                    '#ff2549',
                                    '#36A2EB'
                                ]
                            }]
                        }}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        max: 15,
                                        stepSize: 1
                                    }
                                }]

                            }}}
                    />
                </div>
                <div className={"w3-third"}>
                    <Bar
                        data={{
                            labels: ["Gesamt", "Mädchen", "Jungen"],
                            datasets: [{
                                label:"Durchschnittspunkte",
                                data: [statistics.avgTotal, statistics.avgFemale, statistics.avgMale],
                                backgroundColor: [
                                    '#278500',
                                    '#ff2549',
                                    '#36A2EB'
                                ]
                            }]
                        }}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        max: statistics.totalReachable,
                                        stepSize: 5
                                    }
                                }]

                            }}}
                    />
                </div>
            </div>
        </div>
    )

};

Overview.propTypes = {};
export default Overview