import React from 'react';
import { Form, Input, Button, Tabs, Row, Col } from 'antd';


var onFinish = function (values) {
    console.log('Received values of form: ', values);
};
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const onClickLogin = (e) => {
  window.location.href = "/Home";
};

function Login(props) {
  return (
    <div className="bg">
      <div className="login_card">
        <h1 className="login-title">Log in</h1>
        <h2 className="login-title2">Welcome to our MovieFinder!</h2>
        <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter user name!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
              >
                <Input placeholder="User Name" bordered={false} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
              >
                <Input
                  bordered={false}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>


              <Form.Item className="login-title2">
                Don't have an account? <a href="/Register">Sign up!</a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ height: '56PX', borderRadius: '12PX' }} onClick={onClickLogin}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
      </div>
    </div>
  )
}

export default Login;

 
