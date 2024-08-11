import React from "react";
import { Form, Input, Button, message } from "antd";
import { signup } from "../api";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await signup(values);
      message.success("Signup successful!");
    } catch (error) {
      message.error(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <Form
            name="signup"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            className="register-form"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                className="login__input"
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
                className="login__input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
                  message:
                    "Password must be at least 7 characters, with 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Password"
                className="login__input"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="login__submit"
              >
                Sign Up
              </Button>
            </Form.Item>
            <span>Want to Login?</span>
            <Button
              type="link"
              onClick={handleLoginClick}
              className="login-btn"
            >
              Login
            </Button>
          </Form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
