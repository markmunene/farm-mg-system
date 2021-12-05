import React, { useContext, useState } from "react";

import { useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";

import { useContacts } from "./context/UsersDetails";
import StarRating from "./pages/products/ratingComponent";

export default function Testing() {
    const { value, Farmercontacts } = useContacts();
    const [v, setV] = useState();

    const auth = useContext(AuthContext);

    const rateChanged = (l) => {
        console.log("in testing" + l);
    };
    return (
        <>
            <center className="testingWrapper">
                <h2>working fine men {auth.User_Role}</h2>

                {Farmercontacts?.map((items, i) => {
                    return (
                        <>
                            <h1 key={i}>{items}</h1>
                        </>
                    );
                })}

                <StarRating
                    onChange={rateChanged}
                    value={1}
                    numberOfStars={5}
                    editable={true}
                    Color={"#ffd633"}
                />
            </center>
            <div className="testingGrid">
                <div className="card1 d-flex justify-content-center align-content-center ">
                    <h2>mimi ni nani nisimshukuru mungu</h2>
                </div>
                <div className="card1 d-flex justify-content-center align-content-center ">
                    <h2>mimi ni nani nisimshukuru mungu</h2>
                </div>
                <div className="card1 d-flex justify-content-center align-content-center ">
                    <h2>mimi ni nani nisimshukuru mungu</h2>
                </div>
                <div className="card1 d-flex justify-content-center align-content-center ">
                    <h2>mimi ni nani nisimshukuru mungu</h2>
                </div>
                <div className="card1 d-flex justify-content-center align-content-center ">
                    <h2>mimi ni nani nisimshukuru mungu</h2>
                </div>
                <div className="card1 d-flex justify-content-center align-content-center ">
                    <h2>mimi ni nani nisimshukuru mungu</h2>
                </div>
            </div>
        </>
    );
}
