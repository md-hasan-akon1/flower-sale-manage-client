import React from "react";
import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Headers from "../Layout/Header";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TUser, getCurrenUser, setUser } from "../redux/features/user/UserSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLoginMutation } from "../redux/features/user/userApi";
const Login = () => {
  const location=useLocation()
  const userS=useAppSelector(getCurrenUser)
  const navigate=useNavigate()
 
  
  const [login, { data, isLoading }] = useLoginMutation();
const dispatch=useAppDispatch()
  const onFinish =async (values: any) => {

    const userInfo = {
      username: values.username,
      password: values.password,
    };
   const res= await login(userInfo).unwrap();
 const user=  verifyToken(res.data)
    dispatch(setUser({user:user,token:res.data}))
   return navigate(`/${(user as TUser).role}`)
  };
  return (
    <div>
      <Headers></Headers>
      <div className="login-page">
        <div className="login-container">
          <Card title={<h2 style={{color:'white',textAlign:"center"}}>Login</h2>} bordered={false} className="login-card">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button disabled={isLoading} htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                <p style={{ color: "white" }}>
                  Don't have an account
                  <NavLink to="/registration">
                    <strong style={{ color: "blue" }}>registration</strong>
                  </NavLink>
                </p>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
