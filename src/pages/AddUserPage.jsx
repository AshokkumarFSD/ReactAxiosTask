import AddNewUser from "../components/AddNewUser";
import Header from "../components/Header";
import MainComp from "../components/MainComp";

export default function AddUserPage() {
    return (
        <div>
            <Header></Header>
            <MainComp>
              <AddNewUser></AddNewUser>
            </MainComp>
        </div>
    )
}
