import SideDrawer from "./SideDrawer";
import Content from "./Content";
import NavigationList from "./NavigationList";

const MainComp = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-1/5 rounded-lg">
        <SideDrawer>
          <NavigationList></NavigationList>
        </SideDrawer>
      </div>
      <div className="w-11/12">
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default MainComp;