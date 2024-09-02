import { createContext, useContext, useEffect, useReducer, useState } from "react"
import axios from "axios";

export const AppCxt = createContext(null)

export function AppContext({ children }) {

    // reducer function to handle all crud operation state udpates
    function reducer(state, action) {
        switch (action.type) {
            case "fetch":
                const resultArray = action.data;
                console.log("state in change fetch : ", resultArray);
                return resultArray;
            case "update":
                const updatedData = action.data;
                let objIndex = state.findIndex(obj => obj.id == updatedData.id);
                const newState = state;
                newState[objIndex] = updatedData;
                return newState;
            case "add":
                const newUser = action.data;
                let allList = state;
                allList.push(newUser);
                return allList;
            case "delete":
                const idToRemove = action.data.id;
                const updatedUsers = state.filter(user => user.id !== idToRemove);
                return updatedUsers;
            default:
                return state
        }
    }

    // reducer declaration
    const [userList, userListDispatch] = useReducer(reducer, [])

    useEffect(() => {
        axios.get("https://66cd7c788ca9aa6c8cca7ddb.mockapi.io/users").then((res) => {
            userListDispatch({ type: "fetch", data: res.data })
        }) .catch((err) => console.log(err));
    }, []);

    return (
        <AppCxt.Provider value={{ userList, userListDispatch }}>
            {children}
        </AppCxt.Provider>
    )
}

export function AppState() {
    return useContext(AppCxt);
}