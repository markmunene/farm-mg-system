import React, { useState, useEffect, useRef } from "react";

import { Link, Route, useRouteMatch } from "react-router-dom";
import CreateAdmin from "./CreateAdmin";

export default function AdminDashBord() {
    const { url, path } = useRouteMatch();
    return (
        <>
            <div className="dashBoardWrapper">
                <h2>dash</h2>
                <h2>waah ni ninw</h2>
                <Link to={`${url}/createAdmin`}>Create</Link>
                <Route
                    path={`${path}/createAdmin`}
                    component={CreateAdmin}
                ></Route>
            </div>
        </>
    );
}
