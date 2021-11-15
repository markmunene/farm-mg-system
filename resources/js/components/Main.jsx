import { useContext, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";


import Routes from "./Routes.jsx";

// import Contact from "./Contact.jsx";

import { UsersDetailsprovider,useContacts } from "./context/UsersDetails.js";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    useRouteMatch,
} from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Main = () => {
   
   
    return (
        <>
            <Router>
                <UsersDetailsprovider>
                
                 <Routes />
                </UsersDetailsprovider>
            </Router>
        </>
    );
};

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
