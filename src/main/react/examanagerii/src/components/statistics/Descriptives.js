import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Bar} from "react-chartjs-2";

const Descriptives = ({statistics}) => {

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

    const colorTotal = '#278500';
    const colorFemale = '#ff2549';
    const colorMale = '#36A2EB';

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"w3-padding"}>
            <div className={"w3-row-padding"}>
                <h4 className={"w3-half"}>Höchste Punktzahl</h4>
                <h4 className={"w3-half"}>Standardabweichung</h4>
            </div>
            <div className={"w3-row-padding"}>
                <div className={"w3-half"}>
                    <Bar
                        data={{
                            labels: ["Gesamt", ...statistics.exam.exercises.map(ex => ex.name)],
                            datasets: [
                                {
                                    label:"Mädchen",
                                    data:[
                                        statistics.maxReachedFemale,
                                        ...statistics.exerciseStatistics.map(ex => ex.maxReachedFemale)
                                    ],
                                    backgroundColor: colorFemale,

                                },
                                {
                                    label:"Jungen",
                                    data:[
                                        statistics.maxReachedMale,
                                        ...statistics.exerciseStatistics.map(ex => ex.maxReachedMale)
                                    ],
                                    backgroundColor: colorMale,

                                }
                            ]
                        }}

                    />
                </div>

                <div className={"w3-half"}>
                    <Bar
                        data={{
                            labels: ["Gesamt", ...statistics.exam.exercises.map(ex => ex.name)],
                            datasets: [
                                {
                                    label:"Gesamt",
                                    data:[
                                        statistics.deviation,
                                        ...statistics.exerciseStatistics.map(ex => ex.deviation)
                                    ],
                                    backgroundColor: colorTotal,

                                }
                            ]
                        }}

                    />
                </div>
            </div>

            <div className={"w3-row-padding"}>
                <h4 className={"w3-half"}>Schwierigkeit</h4>
                <h4 className={"w3-half"}>Trennschärfe</h4>
            </div>
            <div className={"w3-row-padding"}>
                <div className={"w3-half"}>
                    <Bar
                        data={{
                            labels: ["Gesamt", ...statistics.exam.exercises.map(ex => ex.name)],
                            datasets: [{
                                    label:"Gesamt",
                                    data:[
                                        statistics.difficulty,
                                        ...statistics.exerciseStatistics.map(ex => ex.difficulty)
                                    ],
                                    backgroundColor: "#cc4b09",

                            }],
                        }}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        max: 100,
                                        stepSize: 10
                                    }
                                }]

                            }}}
                    />
                </div>

                <div className={"w3-half"}>
                    <Bar
                        data={{
                            labels: statistics.exam.exercises.map(ex => ex.name),
                            datasets: [{
                                label:"Gesamt",
                                data:statistics.exerciseStatistics.map(ex => ex.correlation),
                                backgroundColor: "#cc0059",
                            }],


                        }}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        min: -1,
                                        max: 1,
                                        stepSize: 0.1
                                    }
                                }]

                            }}}

                    />
                </div>

            </div>


        </div>
    )

};

Descriptives.propTypes = {};
export default Descriptives