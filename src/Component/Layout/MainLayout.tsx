import { Button, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

import { Flex } from "antd";
import { Logout, getCurrenUser } from "../redux/features/user/UserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Sidebar from "./Sidebar";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user=useAppSelector(getCurrenUser)
  const handelLogout = () => {
    dispatch(Logout());
    navigate('/login')
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar></Sidebar>
      <Layout>
      <Header style={{ padding: 0, backgroundColor: "#ad6800" }}>
        <Flex justify="flex-end" align="middle">
       {
        user?   <Button
        onClick={handelLogout}
        style={{ marginTop: 10, marginRight: 15 }}
      >
        LogOut
      </Button>:''
       }
        </Flex>
      </Header>
        <Content style={{ marginTop: "24px",}}>
          <div
            style={{
           
              minHeight: 100,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
