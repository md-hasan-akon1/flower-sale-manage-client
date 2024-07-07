import Sider from "antd/es/layout/Sider";
import { sidebarItemGenerator } from "../utils/sidebarItems";
import { Avatar, Menu } from "antd";
import { TSideBarItem } from "../types";
import { SellerPath } from "../routes/Seller.routes";
import { useAppSelector } from "../redux/hooks";
import { TUser, getCurrenToken } from "../redux/features/user/UserSlice";
import { verifyToken } from "../utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import { ManagerPath } from "../routes/ManagerRoute";
import { AdminPath } from "../routes/AdminRoute";
import { useNavigate } from "react-router-dom";
import { userPath } from "../routes/UserRoute";
import { useGetMeQuery } from "../redux/features/user/userApi";

const Sidebar = () => {
  const token = useAppSelector(getCurrenToken);
  const user = verifyToken(token! as string);
  const { data: userData } = useGetMeQuery((user as TUser)?.username,{skip:!user});

  let sidebarItem: any[] = [];
  switch ((user as TUser)?.role) {
    case "Seller":
      sidebarItem = sidebarItemGenerator(SellerPath, (user as TUser)?.role);
      break;
    case "Manager":
      sidebarItem = sidebarItemGenerator(ManagerPath, (user as TUser)?.role);
      break;
    case "Admin":
      sidebarItem = sidebarItemGenerator(AdminPath, (user as TUser)?.role);
      break;
    case "User":
      sidebarItem = sidebarItemGenerator(userPath, (user as TUser)?.role);
      break;
    default:
      break;
  }
  // sidebarItem = sidebarItemGenerator(SellerPath);
  return (
    <div >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#ad6800", height: "100vh", position:'sticky', top:'0', left:'0'}}
      >
        <div
          style={{
            height: "4rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ad6800",
          }}
          className="demo-logo-vertical h-full"
        >
          <h3 style={{ color: "white" }}>Flower Management</h3>
        </div>
        <Avatar
          className="ms-16"
          size={54}
          src={`https://i.ibb.co/XVkMHbY/login-2.png`}
        />
        {
          <h4 style={{ textAlign: "center", color: "white" }}>
            Role: {user && (user as TUser).role} <br />
            {userData?.data?.isMember ? <p>Points: {userData?.data?.points||0}</p> : ``}
          </h4>
        }
        <Menu
          mode="inline"
          style={{ backgroundColor: "#ad6800", color: "white" }}
          defaultSelectedKeys={["4"]}
          items={sidebarItem}
        />
      </Sider>
    </div>
  );
};
export default Sidebar;
