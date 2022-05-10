import React from 'react';
import { Form, Input, Button, Checkbox, Tabs, Row, Col } from 'antd';


var onFinish = function (values) {
    console.log('Received values of form: ', values);
};
function Register(props) {
    return (
        <div className="register-bg">
          <div className="register_card">
            <h1 className="register-title">Sign up</h1>
            <h2 className="register-title2">Welcome to our MovieFinder!</h2>
            <Form
              name="normal_login"
              className="register-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your user name!' }]}
                    style={{ borderBottom: '1px solid #DCDCDC' }}
                >
                    <Input placeholder="User Name" bordered={false} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your code!' }]}
                    style={{ borderBottom: '1px solid #DCDCDC' }}
                >
                    <Input
                    bordered={false}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="Password"
                    rules={[{ required: true, message: 'Please confirm your password!' }]}
                    style={{ borderBottom: '1px solid #DCDCDC' }}
                >
                    <Input
                    bordered={false}
                    type="password"
                    placeholder="Confirm Password"
                    />
                </Form.Item>
        
                <Form.Item className="register-title2">
                    Already have an account? <a href="/Login">Log in!</a>
                </Form.Item>
        
                <Form.Item>
                    <Button type="primary" htmlType="submit" block style={{ height: '56PX', borderRadius: '12PX' }}>
                    Sign up
                    </Button>
                </Form.Item>  
            </Form>
          </div>
        </div>
    );
}

export default Register;