import React, {useState} from 'react'
import PropTypes from 'prop-types';

const ResultTable = ({statistics}) => {

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
                <th>Nachname</th>
                <th>Vorname</th>
                <th>Note</th>
                <th>Gesamt</th>
                {statistics.exam.exercises.map(ex =>
                    <th key={ex.id} className={"w3-right-align"}>{ex.name}</th>
                )}
            </tr>
            {statistics.studentResults.map(s =>
                <tr key={s.student.id}>
                    <td>{s.student.firstname}</td>
                    <td>{s.student.lastname}</td>
                    <td>{s.result.grade.asWord}</td>
                    <td>{s.result.totalReached}</td>
                    {s.result.exercises.map(ex =>
                        <td className={"w3-right-align"} key={"res" + ex.id}>{ex.reached}</td>
                    )}
                </tr>
            )}
        </table>
    )

};

ResultTable.propTypes = {};
export default ResultTable