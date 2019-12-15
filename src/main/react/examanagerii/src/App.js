import React, {useState} from 'react';
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Groups from "./components/groups/Groups";
import Exams from "./components/exams/Exams";
import Statistics from "./components/statistics/Statistics";
import Results from "./components/results/Results";


const App = () => {

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedExam, setSelectedExam] = useState(null);

    return (

        <Router>
            <div className={"w3-card-4 animate-top root-wrapper"}>
                <div className={"w3-sidebar w3-blue w3-bar-block"} style={{minHeight: "100%"}}>
                    <Link to="/" className="w3-button w3-bar-item animate-left navigation"><h3>Examanager</h3></Link>
                    <Link to={"/exam"} className={"w3-bar-item w3-button animate-left navigation"}>Klausuren</Link>
                    <Link to={"/class"} className={"w3-bar-item w3-button animate-left navigation"}>Klassen</Link>
                    <Link to={"/results"} className={"w3-bar-item w3-button animate-left navigation"}>Ergebnisse</Link>
                    <Link to={"/statistics"} className={"w3-bar-item w3-button animate-left navigation"}>Statistiken</Link>
                    <Link to={"/class"} className={"w3-bar-item w3-button animate-left navigation"}>Logout</Link>
                </div>

                <div className={"w3-white"} style={{marginLeft: 200, minHeight: "100%"}}>
                    <Route path={"/admin"} render={() =>
                        <Admin/>
                    }/>
                    <Route path={"/class"} render={() =>
                        <Groups/>
                    }/>
                    <Route path={"/exam"} render={() =>
                        <Exams/>
                    }/>
                    <Route path={"/statistics"} render={() =>
                        <Statistics/>
                    }/>
                    <Route path={"/results"} render={() =>
                        <Results/>
                    }/>
                    <Route exact path={"/"} render={() =>
                        <Landing/>
                    }/>
                </div>
            </div>
        </Router>



    )

};
export default App;
