import { useEffect,useState } from "react";
import Header from "../components/Header";
import MainComp from "../components/MainComp";
import { UserCard } from "../components/UserCard";
import { AppState } from "../context/AppContext";
import Loader from "../components/Loader";
import axios from "axios";


export default function UserListPage() {

  return (
    <div>
      <Header>
      </Header>
      <MainComp>
        <UserListUI></UserListUI>
      </MainComp>
    </div>
  );
}

function UserListUI() {
  const { userList } = AppState();
  return (
    <div className="user_card_coordinator">
      {userList.length>0? 
          userList.map((val) => (
            <UserCard key={val.id} data={val}></UserCard>
          )):<Loader></Loader>}
    </div>
  )

}