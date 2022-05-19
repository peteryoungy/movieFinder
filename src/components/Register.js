import React, { Component, useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Tabs, Row, Col, message } from "antd";
import { Auth } from "aws-amplify";
import * as AWS from "aws-sdk";

function Register(props) {
    const [regState, setRegState] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false,
        },
    });

    useEffect(() => {
        console.log("regState", regState);
    }, [regState]);

    const handleSubmit = () => {
        const { username, password, email } = regState;
        console.log("username, password, email", username, password, email);

        // AWS Cognito integration here
        Auth.signUp({
            username,
            password,
            attributes: {
                email: email,
            },
        })
            .then((res) => {
                console.log("signup res", res);
                const signUpResponse = res;

                // DynamoDB
                const dynamodb = new AWS.DynamoDB.DocumentClient();

                let params = {
                    TableName: "user",
                    Item: {
                        user_id: signUpResponse["userSub"],
                        username: username,
                        email: email,
                        movieLikeHistory: [],
                        genreLikeHistory: [],
                    },
                };

                console.log(params);

                dynamodb.put(params, function (err, data) {
                    if (err) {
                        console.log("dynamodb err", err);
                    } else {
                        console.log("dynamodb data", data);
                    }
                });

                // display success message, after 5 seconds, redirect to login page.
                message.success({
                    content:
                        "New account created successfully. Check your email box to confirm your account. You will be redirect to login page in 5 seconds.",
                    style: {
                        margin: "auto",
                        marginTop: "30vh",
                        width: "500px",
                    },
                    duration: 5,
                });
                setTimeout(() => {
                    window.location.href = "/login";
                }, 5000);
            })
            .catch((error) => {
                let err = null;
                !error.message ? (err = { message: error }) : (err = error);
                setRegState({
                    ...regState,
                    errors: {
                        ...regState.errors,
                        cognito: err,
                    },
                });
                console.log("reg.errors", regState.errors);

                // display error message
                message.error({
                    content: "Register failed. Please retry.",
                    style: {
                        marginTop: "30vh",
                    },
                    duration: 3,
                });
            });
    };

    const onChange = (event) => {
        setRegState({
            ...regState,
            [event.target.id]: event.target.value,
        });
    };

    const passwordValidator = (_, value) => {
        console.log("password validator triggered.");

        if (value.length < 8) {
            return Promise.reject(
                new Error("Password must not be shorter than 8 characters.")
            );
        }

        let regex = new RegExp(".*[a-z]");

        if (!regex.test(value)) {
            return Promise.reject(
                new Error(
                    "Password must contain at least 1 lowercase character."
                )
            );
        }

        regex = new RegExp(".*[A-Z]");

        if (!regex.test(value)) {
            return Promise.reject(
                new Error(
                    "Password must contain at least 1 uppercase character."
                )
            );
        }
        // /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g
        const specialChars = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g;
        if (!specialChars.test(value)) {
            return Promise.reject(
                new Error("Password must contain at least 1 special character.")
            );
        }

        return Promise.resolve();
    };

    return (
        <div className="register-bg">
            <div className="register_card">
                <h1 className="register-title">Sign up</h1>
                <h2 className="register-title2">Welcome to our MovieFinder!</h2>
                <Form
                    name=""
                    className="register-form"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username!",
                            },
                        ]}
                        style={{ borderBottom: "1px solid #DCDCDC" }}
                    >
                        <Input
                            placeholder="User Name"
                            bordered={false}
                            value={regState.username || ""}
                            onChange={onChange}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                        ]}
                        style={{ borderBottom: "1px solid #DCDCDC" }}
                    >
                        <Input
                            placeholder="Email"
                            bordered={false}
                            value={regState.email || ""}
                            onChange={onChange}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                // message: "Please enter your password!",
                                validator: passwordValidator,
                            },
                        ]}
                        style={{ borderBottom: "1px solid #DCDCDC" }}
                    >
                        <Input
                            bordered={false}
                            type="password"
                            placeholder="Password"
                            value={regState.password || ""}
                            onChange={onChange}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmpassword"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                        ]}
                        style={{ borderBottom: "1px solid #DCDCDC" }}
                    >
                        <Input
                            bordered={false}
                            type="password"
                            placeholder="Confirm Password"
                            value={regState.confirmpassword || ""}
                            onChange={onChange}
                        />
                    </Form.Item>

                    <Form.Item className="register-title2">
                        Already have an account? <a href="/Login">Log in!</a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ height: "56PX", borderRadius: "12PX" }}
                        >
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Register;
