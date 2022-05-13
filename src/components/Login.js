import React, { Component } from 'react';
import { Form, Input, Button, Tabs, Row, Col } from 'antd';
import { Auth } from "aws-amplify";

// var onFinish = function (values) {
//   console.log('Received values of form: ', values);
// };
const {TabPane} = Tabs;

// function callback(key) {
//   console.log(key);
// }
//
// const onClickLogin = (e) => {
//   window.location.href = "/Home";
// };

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {

    // AWS Cognito integration here
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log(user);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      this.props.history.push("/");
    } catch (error) {
      let err = null;
      !error.message ? err = {"message": error} : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
        <div className="bg">
          <div className="login_card">
            <h1 className="login-title">Log in</h1>
            <h2 className="login-title2">Welcome to our MovieFinder!</h2>
            <Form
                name=""
                className="login-form"
                initialValues={{remember: true}}
                onFinish={this.handleSubmit}
            >
              <Form.Item
                  name="username"
                  rules={[{required: true, message: 'Please enter user name!'}]}
                  style={{borderBottom: '1px solid #DCDCDC'}}
              >
                <Input
                    placeholder="User Name"
                    bordered={false}
                    value={this.state.username}
                    onChange={this.onInputChange}
                />
              </Form.Item>
              <Form.Item
                  name="password"
                  rules={[{required: true, message: 'Please enter your password!'}]}
                  style={{borderBottom: '1px solid #DCDCDC'}}
              >
                <Input
                    bordered={false}
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onInputChange}
                />
              </Form.Item>


              <Form.Item className="login-title2">
                Don't have an account? <a href="/Register">Sign up!</a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{height: '56PX', borderRadius: '12PX'}}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
    )
  }
}

export default Login;

 
