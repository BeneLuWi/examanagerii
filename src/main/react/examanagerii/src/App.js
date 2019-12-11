import React, {useState} from 'react';
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Groups from "./components/groups/Groups";
import Exam from "./components/exam/Exam";
import Statistics from "./components/statistics/Statistics";


const App = () => {

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedExam, setSelectedExam] = useState(null);

    return (

        <Router>
            <div className={"w3-card-4 animate-top root-wrapper"}>
                <div className={"w3-sidebar w3-blue w3-bar-block"} style={{height: "100%"}}>
                    <Link to="/" className="w3-button w3-bar-item animate-left navigation"><h3>Examanager</h3></Link>
                    <Link to={"/exam"} className={"w3-bar-item w3-button animate-left navigation"}>Klausuren</Link>
                    <Link to={"/class"} className={"w3-bar-item w3-button animate-left navigation"}>Klassen</Link>
                    <Link to={"/statistics"} className={"w3-bar-item w3-button animate-left navigation"}>Statistiken</Link>
                    <Link to={"/class"} className={"w3-bar-item w3-button animate-left navigation"}>Logout</Link>
                </div>

                <div className={"w3-white"} style={{marginLeft: 200, height: "100%"}}>
                    <Route path={"/admin"} render={() =>
                        <Admin/>
                    }/>
                    <Route path={"/class"} render={() =>
                        <Groups/>
                    }/>
                    <Route path={"/exam"} render={() =>
                        <Exam/>
                    }/>
                    <Route path={"/statistics"} render={() =>
                        <Statistics/>
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
