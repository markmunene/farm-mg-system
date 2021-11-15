import React, { useContext, useState,useEffect } from "react";

import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";

// import AuthContext from "../context/AuthContext";
import { useContacts } from "../context/UsersDetails.js";
import "./Navbar.css";

export default function Navbar()
{
 
    const { user, EmptyUser } = useContacts();
    console.log(user);
    let emptyObj ={};

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-sticky">
                <Link className="navbar-brand" to="#">
                    Farm-management
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav  ml-auto">
                        <li className="nav-item ">
                            <Link className="nav-link react-link" to="#">
                                Expense-Tracker
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link react-link"
                                to="/homechat"
                            >
                                Chat-Module
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link react-link"
                                to="/bloghome"
                            >
                                Blog
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link react-link" to="#">
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link react-link"
                                to="/contactUs"
                            >
                                Contact Us
                            </Link>
                        </li>
                        {Object.keys(user).length === 0 ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link react-link btn register  "
                                        to="/register"
                                    >
                                        <i className="icofont-people"></i>
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link react-link btn loginbtn  mr-2"
                                        to="/login"
                                    >
                                        <i className="icofont-lock"></i>Login
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-sm btn-danger nav-link text-light"
                                        onClick={() => {
                                            {
                                                axios.defaults.withCredentials = true;
                                                axios
                                                    .get("/sanctum/csrf-cookie")
                                                    .then((response) => {
                                                        axios
                                                            .post("/logout")
                                                            .then(
                                                                (response) => {
                                                                    EmptyUser();
                                                                }
                                                            );
                                                    });
                                            }
                                        }}
                                    >
                                        logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            {/* <div className="widgetleft ">
                <a href="" style={{ backgroundColor: " #1da1f2" }}>
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="" style={{ backgroundColor: "#4267b2" }}>
                    <i className="fab fa-facebook " aria-hidden="true"></i>
                </a>

                <a href="" style={{ backgroundColor: "red" }}>
                    <i className="fab fa-youtube " aria-hidden="true"></i>
                </a>
            </div>
            git remote add origin https://github.com/markmunene/farm-mg-system.git
            
            */}
        </>
    );
}
