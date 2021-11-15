import { useContext, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import HomeChat from "./pages/homeChat.jsx";

import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import Create from "./blog/Create.jsx";
import BlogHome from "./blog/BlogHome.jsx";
import SinglePost from "./blog/SinglePost.jsx";
import Testing from "./Testing.jsx";
import NotFound from "./NotFound.jsx";
import Navbar from "./navigation/Navbar.jsx";

import Contact from "./Contact.jsx";

import {  useContacts } from "./context/UsersDetails.js";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    useRouteMatch,
    useHistory,
    Redirect
} from "react-router-dom";
// import axios from "axios";
// import moment from "moment";

const Routes = (props) =>
{
    const { user } = useContacts();

    // const [testUser, setTestUser] = useState([]);

    // useCallback(
    //     () => {
    //         setTestUser(user)
    //     },
    //     []
    // )

    // const { history } = useHistory();
    return (
        <>
            <Navbar />

            <Route path="/login" component={Login} />
            {Object.keys(user).length === 0 ? (
              
                //    props.history.push('/login')  
                        // <Redirect to="/login" />
             ""
               
            ) : (
                <>
                    <Route path="/" exact component={Testing} />
                    <Route path="/homechat" exact component={HomeChat}></Route>

                    <Route path="/create" component={Create} />
                    <Route path="/contactUs" component={Contact} />

                    <Route path={`/singlePost`} component={SinglePost} />

                    <Route path="/register" component={Register} />
                    <Route path="/bloghome" component={BlogHome} />

                    {/* <Route component={NotFound} /> */}
                </>
            )}
        </>
    );
};

export default Routes;
