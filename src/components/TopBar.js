import React, { useEffect, Component } from "react";
import { Layout, Input, Row, Col, Button, Menu, Dropdown, Space } from "antd";
import { SearchOutlined, AudioOutlined, DownOutlined, WindowsFilled } from "@ant-design/icons";
import SearchBar from "./SearchBar";
import { Auth } from 'aws-amplify';

const { Header} = Layout;

// const suffix = (
//     <AudioOutlined
//         style={{
//             fontSize: 16,
//             color: "#000000",
//         }}
//     />
// );
const isLoggedIn = true;

const items = [
    {
        label: "Likes",
        key: "1",
    },
    {
        label: "Logout",
        key: "2",
    },
];


class TopBar extends Component {

    handleLogOut = async event => {
        try {
            await Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
            console.log(this.props.auth)
            window.location.href = '/login'
        } catch (error) {
            console.log(error.message);
        }
    }

    handleMenuClick = (e) => {
        console.log("click", e);

        if (e.key === '1') {
            window.location.href = '/likes'
            if(this.props.auth.isAuthenticated){
                console.log(this.props.auth.user.attributes.sub)
            }
            else{
                console.log("false")
            }
        }

        if (e.key === '2') {
            this.handleLogOut();
        }
    }

    // const menu = <Menu onClick={handleMenuClick} items={items}/>;

    render() {
        return (
            <Header>
                <Row justify="space-between">
                    <Col span={10} className="pointer midd" onClick={() => {window.location.href='/home'}}>
                        <div id="title"> MovieFinder!</div>
                        {/* <Search
                        suffix={suffix}
                        enterButton
                        placeholder="Enter Search"
                    /> */}

                        <SearchBar/>
                    </Col>
                    <Col span={11}></Col>
                    <Col>
                        {isLoggedIn ?
                            (
                                <Dropdown overlay={<Menu onClick={this.handleMenuClick} items={items}/>}>
                                    <Button type="primary">
                                        <Space>
                                            Account
                                            <DownOutlined/>
                                        </Space>
                                    </Button>
                                </Dropdown>
                            )
                            :
                            (
                                <Space>
                                    <Button type="link" onClick={() => {
                                        window.location.href = "/login"
                                    }}> Sign In</Button>
                                    <Button type="primary" onClick={() => {
                                        window.location.href = "/register"
                                    }}> Sign Up</Button>
                                </Space>

                            )
                        }
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default TopBar;
