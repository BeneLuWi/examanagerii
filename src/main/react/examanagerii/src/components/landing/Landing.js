import React, {useState} from 'react'
import PropTypes from 'prop-types';
import Accordion from "../../assets/components/Accordion";

const Landing = ({}) => {

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
        <div className={"content-wrapper animate-left"}>
            <h1>Willkommen im Examanager</h1>
            <h4>
                Mit Hilfe des Examanagers können Statistiken zu Klausurergebnissen Ihrer Klassen erhoben und dargestellt werden.
                Bei der Version die Sie aktuell verwenden handelt es sich um eine Test-Version die für diese Veranstaltung programmiert
                wurde. Bei Anmerkungen, Fragen und Kritik zum Progamm, können Sie eine gerne Mail an&nbsp;
                <a href={"mailto:b.lueken.winkels@gmail.com"}>b.lueken.winkels@gmail.com</a>.  Bei inhaltlichen Fragen wenden Sie sich bitte an Ihren Dozenten.
            </h4>

            <Accordion
                title={"Schnellstart"}
                expanded={false}
                child={
                    <ul className={"w3-ul"}>
                        <li>Erstellen Sie eine Klasse</li>
                        <li>Fügen Sie der Klasse einige SchülerInnen hinzu (einige der Statistiken funktioniern nur, wenn die Klasse mehr, als einen Schüler hat).</li>
                        <li>Erstellen Sie eine Klausur.</li>
                        <li>Fügen Sie der Klausur einige Aufgaben hinzu.</li>
                        <li>Tragen Sie Ergebnisse für die SchülerInnen für die entsprechende Klausur ein.</li>
                        <li>🎉 Glückwunsch 🎉 Jetzt können Sie sich die Statistiken zum Klausurergebnis angucken und als CSV-Datei herunterladen </li>
                    </ul>
                }
            />
            <Accordion
                title={"Beschreibung der deskriptiven Statistiken"}
                expanded={false}
                child={
                    <ul className={"w3-ul"}>
                        <li>
                            <span className={"w3-xlarge"}>Standardabweichung</span><br/>
                            Der	Mittelwert stellt	eine	Repräsentation	einer	Datengruppe	dar.	Die	einzelnen	Daten	liegen um	diesen	Mittelwert	herum	verteilt,	sie	streuen	um	den	Mittelwert. Die	Standardabweichung	gibt	die	mittlere	Streuung	der	Einzelwerte	um	den	Mittelwert	an.Je	größer	der	Wert,	desto	mehr	weichen	die	Einzelergebnisse	vom	Mittelwert	ab.
                        </li>
                        <li>
                            <span className={"w3-xlarge"}>Schwierigkeit</span><br/>
                            Die Schwierigkeit wird anhand der erreichten Punkte für die Klausur und für die einzelnen Aufgaben errechnet.
                            Je	höher	der	Wert	(maximal	100),	desto	<strong>geringer</strong>	die	Schwierigkeit,	resp.	ein Wert	um	50	signalisiert	eine	mittlere	Schwierigkeit.
                        </li>
                        <li>
                            <span className={"w3-xlarge"}>Trennschärfe</span><br/>
                            Bei	der	Trennschärfe (part-whole Korrelation) wird	die	Korrelation	der	einzelnen	Aufgabe	zum Gesamtergebnis	ohne	das	Ergebnis	der	betrachteten	Einzelaufgabe	berechnet.	Die	Trennschärfe	ist	ein	Maß	zur	Überprüfung,	inwieweit	eine	Aufgabe	geeignet	ist,	zwischen	Schülerinnnen	und	Schülern	mit	hoher	und	niedriger	Leistung	zu	unterschieden.	Dabei	wird der	jeweilige	Aufgabenwert	in	Bezug	(Korrelation)	zum	Gesamtergebnis	gebracht.
                        </li>
                    </ul>
                }
            />

        </div>
    )

};

Landing.propTypes = {};
export default Landing