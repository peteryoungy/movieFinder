import React, { useEffect, Component } from "react";
import { Layout, Input, Row, Col, Button, Menu, Dropdown, Space } from "antd";
import {
    SearchOutlined,
    AudioOutlined,
    DownOutlined,
    WindowsFilled,
} from "@ant-design/icons";
import SearchBar from "./SearchBar";
import { Auth } from "aws-amplify";

const { Header } = Layout;

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

function TopBar(props) {
    const { auth } = props;

    const handleLogOut = async (event) => {
        try {
            await Auth.signOut();

            // reset
            auth.setAuthStatus(false);
            auth.setUser(null);

            console.log(auth);
            window.location.href = "/login";
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleMenuClick = (e) => {
        console.log("click", e);

        if (e.key === "1") {
            window.location.href = "/likes";
            if (auth.isAuthenticated) {
                console.log(auth.user.attributes.sub);
            } else {
                console.log("false");
            }
        }

        if (e.key === "2") {
            handleLogOut();
        }
    };

    const renderLoggedInButton = () => {
        // todo: to debug, use isLoggedIn
        if (auth.isAuthenticated === false) {
            return (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            window.location.href = "/login";
                        }}
                    >
                        {" "}
                        Sign In
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            window.location.href = "/register";
                        }}
                    >
                        {" "}
                        Sign Up
                    </Button>
                </Space>
            );
        }

        return (
            <Dropdown
                overlay={<Menu onClick={handleMenuClick} items={items} />}
            >
                <Button type="primary">
                    <Space>
                        Account
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        );
    };

    return (
        <Header>
            <Row justify="space-between">
                <Col span={10} className="pointer midd">
                    <div
                        id="title"
                        onClick={() => {
                            window.location.href = "/home";
                        }}
                    >
                        {" "}
                        MovieFinder!
                    </div>

                    <SearchBar />
                </Col>
                {/* <Col span={11}></Col> */}
                <Col>{renderLoggedInButton()}</Col>
            </Row>
        </Header>
    );
}

export default TopBar;
