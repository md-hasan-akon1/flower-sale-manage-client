import { Button, Flex, Layout } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Logout, getCurrenUser } from "../redux/features/user/UserSlice";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
const Headers = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user=useAppSelector(getCurrenUser)
  const handelLogout = () => {
    dispatch(Logout());
  };
  return (
    <div>
      <Header style={{ padding: 0, backgroundColor: "#ad6800" }}>
        <Flex justify="flex-end" align="middle">
       {
        user&&   <Button
        onClick={handelLogout}
        style={{ marginTop: 10, marginRight: 15 }}
      >
        LogOut
      </Button>
       }
        </Flex>
      </Header>
    </div>
  );
};

export default Headers;
