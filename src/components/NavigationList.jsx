import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationList() {

  const navigate = useNavigate();
  return (
    <ul className="flex flex-col gap-8">
      <li>
        <button className="btn btn-wide w-4/5 bg-accent text-white  hover:bg-violet-600"
          onClick={() => navigate("/")}>
          Dashboard
        </button>
      </li>
      <li>
        <button className="btn btn-wide w-4/5 bg-accent text-white hover:bg-violet-600"  
        onClick={()=>navigate("/userlist")}>
          User List
        </button>
      </li>
      <li>
        <button className="btn btn-wide w-4/5 bg-accent text-white hover:bg-violet-600"  
        onClick={()=>navigate("/adduser")}>
          Add User
        </button>
      </li>
    </ul>
  );
}