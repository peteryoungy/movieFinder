import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Tabs, Row, Col } from "antd";
import { Auth } from "aws-amplify";

// var onFinish = function (values) {
//     console.log('Received values of form: ', values);
// };

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false,
        },
    };

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                blankfield: false,
                passwordmatch: false,
            },
        });
    };

    handleSubmit = async (event) => {
        console.log(this.state);

        // AWS Cognito integration here
        const { username, email, password } = this.state;
        try {
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email,
                },
            });
            console.log(signUpResponse);

            // DynamoDB
            const AWS = require("aws-sdk");
            AWS.config.accessKeyId = process.env["REACT_APP_ACCESS_KEY_ID"];
            AWS.config.secretAccessKey =
                process.env["REACT_APP_SECRET_ACCESS_KEY"];
            AWS.config.region = "us-east-1";

            // console.log('access_key_id', process.env['REACT_APP_ACCESS_KEY_ID']);
            // console.log('secret_key', process.env['REACT_APP_SECRET_ACCESS_KEY']);

            const dynamodb = new AWS.DynamoDB.DocumentClient();

            var params = {
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
                if (err) console.log(err);
                else console.log(data);
            });

            this.props.history.push("/login");
        } catch (error) {
            let err = null;
            !error.message ? (err = { message: error }) : (err = error);
            this.setState({
                errors: {
                    ...this.state.errors,
                    cognito: err,
                },
            });
            console.log(this.state.errors);
        }
    };

    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    passwordValidator = (_, value) => {
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

    render() {
        return (
            <div className="register-bg">
                <div className="register_card">
                    <h1 className="register-title">Sign up</h1>
                    <h2 className="register-title2">
                        Welcome to our MovieFinder!
                    </h2>
                    <Form
                        name=""
                        className="register-form"
                        initialValues={{ remember: true }}
                        onFinish={this.handleSubmit}
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
                                value={this.state.username || ""}
                                onChange={this.onChange}
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
                                value={this.state.email || ""}
                                onChange={this.onChange}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!",
                                    validator: this.passwordValidator,
                                },
                            ]}
                            style={{ borderBottom: "1px solid #DCDCDC" }}
                        >
                            <Input
                                bordered={false}
                                type="password"
                                placeholder="Password"
                                value={this.state.password || ""}
                                onChange={this.onChange}
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
                                value={this.state.confirmpassword || ""}
                                onChange={this.onChange}
                            />
                        </Form.Item>

                        <Form.Item className="register-title2">
                            Already have an account?{" "}
                            <a href="/Login">Log in!</a>
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
}

export default Register;
