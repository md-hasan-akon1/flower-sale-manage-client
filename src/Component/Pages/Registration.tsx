import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import Headers from "../Layout/Header";
import { useRegistrationMutation } from "../redux/features/user/userApi";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Registration = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useRegistrationMutation();
  const onFinish: SubmitHandler<FieldValues> = async (values) => {
    toast.loading("login.....", { id: "product" });
    const registrationData = {
      ...values,
      role: "User",
    };
    try {
      const res = await createUser(registrationData).unwrap();
      console.log(res);
      if (res.success) {
        toast.loading("Registration successfully", {
          id: "product",
          duration: 3,
        });
      }
      form.resetFields();
      navigate("/login");
    } catch (err) {
    
      toast.error('Registered Failed', { id: "product" });
    }
    // Handle form submission logic here
    console.log("Received values:", values);
  };
  return (
    <div>
      <Headers></Headers>
      <div className="registration-page">
        <div className="registration-container">
          <Card
            style={{ textAlign: "center" }}
            title={<h2 style={{ color: "white" }}>Registration</h2>}
            bordered={false}
            className="login-card"
          >
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="name"
                />
              </Form.Item>
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
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <div className="btn-flex">
                  <Button
                    disabled={isLoading}
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Register
                  </Button>
                  <p style={{ color: "white" }}>
                    Already have an account{" "}
                    <NavLink to="/login">
                      <strong style={{ color: "blue" }}>Login</strong>{" "}
                    </NavLink>
                  </p>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Registration;
