import React,{useContext} from 'react'

import { useLocation } from 'react-router-dom'
import AuthContext from './context/AuthContext';

import { useContacts } from './context/UsersDetails';

export default function Testing()
{ 
    const { contacts, Farmercontacts } = useContacts();
    

   
 const auth = useContext(AuthContext)
    return (
        <>
            <center className="testingWrapper">
                <h2>working fine men {auth.User_Role}</h2>

                {Farmercontacts?.map((items,i) => {
                    return (
                        <>
                            <h1 key={i}>{items}</h1>
                        </>
                    );
                })}
            </center>
        </>
    );
}
