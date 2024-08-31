import {  createContext, useContext, useEffect, useReducer, useState } from "react"
import axios from "axios";

export const AppCxt = createContext(null)

export function AppContext({children})
{

    function reducer(state,action)
    {
        console.log("state in reducer : ",state);
        switch(action.type)
        {
            case "fetch":
                const resultArray = action.data;
                console.log("state in change fetch : ",resultArray);
                return resultArray;
            default:
                return state
        }
    }

    const [userList,userListDispatch] = useReducer(reducer,[])

    useEffect(()=>{
        axios.get("https://66cd7c788ca9aa6c8cca7ddb.mockapi.io/users").then((res)=>{
            userListDispatch({type:"fetch",data:res.data})
        }
      )
        .catch((err)=>console.log(err));
      },[]);

    return(
        <AppCxt.Provider value={{userList,userListDispatch}}>
            {children}
        </AppCxt.Provider>
    )
}

export function AppState()
{
    return useContext(AppCxt);
}