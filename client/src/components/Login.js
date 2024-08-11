import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api"; 
import ReCAPTCHA from "react-google-recaptcha";
import "./login.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const [captchaVerified, setCaptchaVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // if (!captchaVerified) {
    //   message.error('Please complete the CAPTCHA.');
    //   return;
    // }
    setLoading(true);
    try {
      const response = await login(values);
      message.success("Login successful!");
      localStorage.setItem("token", response.token);
    } catch (error) {
      if (error.response?.data?.message === "Please register to continue.") {
        message.error("Please register to continue.");
        navigate("/signup");
      } 
      else if(error.response?.data?.message === "Invalid Password"){
        message.error("Invalid Password.");
      }
      else {
        message.error(error.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // const onCaptchaChange = (value) => {
  //   console.log("Captcha value:", value);
  //   setCaptchaVerified(!!value);
  // };

  const handleRegisterClick = () => {
    navigate("/signup"); 
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <Form
            name="login"
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
                className="login__input"
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
                placeholder="Password"
                className="login__input"
              />
            </Form.Item>
            {/* <Form.Item>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={onCaptchaChange}
              />
            </Form.Item> */}
            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                className="login__submit"
              >
                Login
              </Button>
            </Form.Item>
            <span>Don't have an account?</span>
            <Button type="link" onClick={handleRegisterClick} className="register-btn">
              Register
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

export default Login;
