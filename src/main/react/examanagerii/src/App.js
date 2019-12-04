import React from 'react';
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const App = () => {

    return (
        <>
            <Router>
                <Route path={"/admin"} render={() =>
                    <Admin/>
                }/>
            </Router>

        </>


    )

};
export default App;
