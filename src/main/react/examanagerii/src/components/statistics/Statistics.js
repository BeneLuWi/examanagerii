import React, {useState, useEffect} from 'react'
import Select from "react-select";
import Notification from "../../assets/components/Notification";
import axios from "axios";
import Accordion from "../../assets/components/Accordion";
import ResultTable from "./ResultTable";
import StatisticsTable from "./StatisticsTable";
import Overview from "./Overview";
import Descriptives from "./Descriptives";

const Statistics = ({}) => {

    /***********
     *
     * Hook States
     *
     ************/
    const [allExams, setAllExams] = useState([]);
    const [exam, setExam] = useState(null);
    const [examOption, setExamOption] = useState(null);

    const [allGroups, setAllGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [group, setGroup] = useState(null);
    const [groupOption, setGroupOption] = useState(null);

    const [statistics, setStatistics] = useState(null);

    const [notification, setNotification] = useState([false, "", true]);

    useEffect(() => {getGroups(); getExams();}, []);

    /***********
     *
     * Functions
     *
     ************/

    const getGroups = () => {
        axios.get("/api/groups/myGroups")
            .then(res => setAllGroups(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Klassen"]))
    };

    const getExams = () => {
        axios.get("/api/exams/myExams")
            .then(res => setAllExams(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Klassen"]))
    };

    const getGroup = (id) => {
        axios.get("/api/students/byGroup/" + id)
            .then(res => setStudents(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Klassen", false]))
    };

    const selectGroup = (opt) => {
        setGroupOption(opt);
        setGroup(allGroups.find(g => g.id === opt.value));
        getGroup(opt.value);
        exam && getStatistics(exam.id, opt.value);
    };

    const selectExam = (opt) => {
        setExamOption(opt);
        setExam(allExams.find(e => e.id === opt.value));
        group && getStatistics(opt.value, group.id);
    };

    const getStatistics = (examId, groupId) => {
        axios.get(`/api/statistics/getStatistics/${examId}/${groupId}`)
            .then(res => setStatistics(res.data))
            .catch(() => setNotification([true, "Fehler beim Laden der Statistiken", false]))
    };

    /***********
     *
     * Rendering
     *
     ************/

    return (
        <div className={"content-wrapper animate-left"}>
            <div>
                <span className={"w3-xxlarge"}>
                    Statistiken&nbsp;
                    {statistics &&
                    <a target={"_blank"} href={`/api/statistics/downloadCsv/${exam.id}/${group.id}`} className={"w3-blue w3-btn w3-small"}>
                        Herunterladen
                    </a>
                    }
                </span>
            </div>

            <div className={"animate-left z2"}>
                <h3>Statistiken für
                </h3>
                <div className={"w3-row"}>
                    <div className={"w3-half"}>
                        <Select
                            options={allGroups.map(g=> ({value: g.id, label: `${g.name}: ${g.description}`}))}
                            onChange={selectGroup}
                            value={groupOption}
                        />
                    </div>
                    <div className={"w3-half"}>
                        <Select
                            options={allExams.map(e=> ({value: e.id, label: `${e.name}: ${e.description}`}))}
                            onChange={selectExam}
                            value={examOption}
                        />
                    </div>
                </div>
            </div>

            {statistics &&
                <div className={"w3-animate-opacity w3-padding-bottom"}>

                    <Accordion
                        title={"Übersicht"}
                        child={
                            <Overview
                                statistics={statistics}
                            />
                        }
                    />

                    <Accordion
                        title={"Deskriptive Statistiken als Graphen"}
                        child={
                            <Descriptives
                                statistics={statistics}
                            />
                        }
                    />

                    <Accordion
                        title={<div>Beschreibung der deskriptiven Statistiken</div>}
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

                    <Accordion
                        title={"Deskriptive Statistiken in Zahlen"}
                        child={
                            <StatisticsTable
                                statistics={statistics}
                            />
                        }
                    />
                    <Accordion
                        title={"Ergebnisse"}
                        child={
                            <ResultTable
                                statistics={statistics}
                            />
                        }
                    />
                </div>
            }

            {notification[0] &&
            <Notification
                notification={notification}
                setNotification={setNotification}
            />
            }
        </div>
    )

}

export default Statistics