import axios from "axios";
import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
import UseLocalStorage from "../UseLocalStorage";

const userContext = React.createContext();

export function useContacts() {
    return useContext(userContext);
}

export function UsersDetailsprovider({ children }) {
    const [contacts, setContacts] = useState([]);
    const [Farmercontacts, setFarmerContacts] = useState([]);
    const [Expertcontacts, setExpertContacts] = useState([]);
   
    const [value, setValue, removeValue] = UseLocalStorage("LocalUser", []);
    const [fetching, setfetching] = useState(true);
    const [user, setUser] = useState([]);
    

    const filterSingleUserDetails = (id) =>
{
    return contacts.filter((items) => items.id === id);
}
 
    useEffect(() => {
        if (fetching) {
            const fetchAllusers = async () => {
                await axios
                    .get("/api/fetchUsers")
                    .then((res) => {
                        setContacts(res.data);
                    })                 
                    .catch((err) => {})
            };
            fetchAllusers();         
             fetchUser();           
        }
        return () =>
        {
         
            setfetching(false);
        };
    }, [value]);
    const fetchUser = async () => {
        await axios
            .get("/api/user")
            .then((res) => {
                if (res.status == 200) {
                    setUser(res.data);
                    setValue(res.data)
               
                } else if (res.status == 401) {
                     
                    setUser([]);
                }
            })
            .catch((error) =>
            {
                
                if (error.response.status == 401) {
                    removeValue();
                }
                console.log(error);
            });
    };
    

  
    useEffect(() => {
        filterUsers();
       

        return () => {};
    }, [contacts]);


    const filterUsers = () =>
    {
          contacts.filter((items, i) => {
              if (items.User_Role == 1) {
                
               return  setFarmerContacts(prev =>[...prev, items.name])
              } else if (items.User_Role == 2) {
                 return setExpertContacts(prev=>[...prev,items.name]) 
              }
          });
      }
    // console.log(Farmercontacts);
   const  setNewUser = () =>
    {
     return   fetchUser();
    } 
    const EmptyUser = () =>
    {
    
        removeValue();
      return  setUser([]);
    }

    return (
        <userContext.Provider
            value={{
                value,
                Farmercontacts,
                Expertcontacts,
                contacts,
                user,
                setNewUser,
                EmptyUser,
                filterSingleUserDetails,
            }}
        >
            {children}
        </userContext.Provider>
    );
}
