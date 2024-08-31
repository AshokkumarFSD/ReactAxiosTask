import Header from "../components/Header";
import MainComp from "../components/MainComp";
import ViewUser from "../components/ViewUser";
import { useParams } from "react-router-dom";

export default function ViewUserPage() {
    const { userId } = useParams();

    return (
        <div>
            <Header></Header>
            <MainComp>
              <ViewUser userId={userId}></ViewUser>
            </MainComp>
        </div>
    )
}
