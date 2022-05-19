import React, { Component, useContext, useState, useRef } from "react";
import { Form, Input, Button, Tabs, Row, Col, message } from "antd";
import { Auth } from "aws-amplify";
import { authContext } from "./App";
// var onFinish = function (values) {
//   console.log('Received values of form: ', values);
// };
const { TabPane } = Tabs;

// function callback(key) {
//   console.log(key);
// }
//
// const onClickLogin = (e) => {
//   window.location.href = "/Home";
// };

function Login(props) {
    const { auth } = useContext(authContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        cognito: null,
        blankfield: false,
    });

    const passwordRef = useRef();

    const handleSubmit = () => {
        Auth.signIn(username, password)
            .then((res) => {
                const user = res;
                console.log("res_user", user);
                auth.setIsAuthenticated(true);
                auth.setUser(user);
                window.location.href = "/";
            })
            .catch((error) => {
                let err = null;
                !error.message ? (err = { message: error }) : (err = error);
                setErrors({
                    ...errors,
                    cognito: err,
                });
                message.error({
                    content: "Incorrect ID or password. Please re-enter.",
                    style: {
                        marginTop: "30vh"
                    },
                });

                // focus
                passwordRef.current.focus();
            });
    };

    const onUserNameChange = (event) => {
        console.log("event.target", event.target);
        // console.log("event.target.id", event.target.id);
        setUsername(event.target.value);
    };

    const onPasswordChange = (event) => {
        console.log("event.target", event.target);
        // console.log("event.target.id", event.target.id);
        setPassword(event.target.value);
    };

    return (
        <div className="bg">
            <div className="login_card">
                <h1 className="login-title">Log in</h1>
                <h2 className="login-title2">Welcome to our MovieFinder!</h2>
                <Form
                    name=""
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter user name!",
                            },
                        ]}
                        style={{ borderBottom: "1px solid #DCDCDC" }}
                    >
                        <Input
                            placeholder="User Name"
                            bordered={false}
                            value={username}
                            onChange={onUserNameChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                        style={{ borderBottom: "1px solid #DCDCDC" }}
                    >
                        <Input
                            bordered={false}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={onPasswordChange}
                            ref={passwordRef}
                        />
                    </Form.Item>

                    <Form.Item className="login-title2">
                        Don't have an account? <a href="/Register">Sign up!</a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ height: "56PX", borderRadius: "12PX" }}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
