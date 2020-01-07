import React, {useState} from 'react'
import PropTypes from 'prop-types';

const StatisticsTable = ({statistics}) => {

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

    if (!statistics) return null;

    return (
        <table className={"w3-table-all"}>
            <tr>
                <th>Metrik</th>
                <th>Gesamt</th>
                {statistics.exam.exercises.map(ex =>
                    <th key={ex.id}>{ex.name}</th>
                )}
            </tr>
            <tr>
                <td>Höchste Punktzahl</td>
                <td>{statistics.maxReachedTotal}</td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.maxReachedTotal}</td>
                )}
            </tr>
            <tr>
                <td>Höchste Punktzahl w</td>
                <td>{statistics.maxReachedFemale}</td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.maxReachedFemale}</td>
                )}
            </tr>
            <tr>
                <td>Höchste Punktzahl m</td>
                <td>{statistics.maxReachedMale}</td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.maxReachedMale}</td>
                )}
            </tr>
            <tr>
                <td>Durchschnittliche Punktzahl</td>
                <td>{statistics.avgTotal}</td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.avgTotal}</td>
                )}
            </tr>
            <tr>
                <td>Durchschnittliche Punktzahl w</td>
                <td>{statistics.avgFemale}</td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.avgFemale}</td>
                )}
            </tr>
            <tr>
                <td>Durchschnittliche Punktzahl m</td>
                <td>{statistics.avgMale}</td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.avgMale}</td>
                )}
            </tr>
            <tr>
                <td>Standardabweichung</td>
                <td>{statistics.deviation}</td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.deviation}</td>
                )}
            </tr>
            <tr>
                <td>Trennschärfe</td>
                <td></td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.correlation}</td>
                )}
            </tr>
            <tr>
                <td>Schwierigkeit</td>
                <td>{statistics.difficulty}</td>
                {statistics.exerciseStatistics.map(ex =>
                    <td>{ex.difficulty}</td>
                )}
            </tr>

        </table>
    )

};

StatisticsTable.propTypes = {};
export default StatisticsTable