import { useEffect, useState } from 'react'
import './App.css'
import UserListPage from './pages/UserList';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import axios from "axios";
import AddUserPage from './pages/AddUserPage';
import ViewUserPage from './pages/ViewUserPage';

function App() {

  // const [userList,setUserList] = useState([]);

  // useEffect(()=>{
  //   axios.get("https://jsonplaceholder.typicode.com/users").then((res)=>{
  //     setUserList(res.data)
  //   }
  // )
  //   .catch((err)=>console.log(err));
  // },[]);

  return (
    <div>
       <Routes>
        <Route exact path='/' element={<LandingPage></LandingPage>}></Route>
        <Route path='/userlist' element={<UserListPage></UserListPage>}></Route>
        <Route path='/viewuser/:userId' element={<ViewUserPage></ViewUserPage>}></Route>
        <Route path='/adduser' element={<AddUserPage></AddUserPage>}></Route>
        <Route path='*' element={<h1>page not found</h1>}></Route>
        
       </Routes>
    </div>
  )
}

export default App
