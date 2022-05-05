import React from "react";
import { Layout, Input, Row, Col, Button, Menu, Dropdown, Space } from "antd";
import { SearchOutlined, AudioOutlined, DownOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: "#000000",
        }}
    />
);

function TopBar(props) {
    const isLoggedIn = true;

    const items = [
        {
            label: "Option 1",
            key: "setting:1",
        },
        {
            label: "Option 2",
            key: "setting:2",
        },
    ];
    
    const menu = <Menu onClick={handleMenuClick} items={items} />;

    function handleMenuClick(e) {
        console.log("click", e);
    }

    return (
        <Header>
            <Row justify="space-between">
                <Col span={10} className="midd">
                    <div className="title"> MovieFinder! </div>
                    <Search
                        suffix={suffix}
                        enterButton
                        placeholder="Enter Search"
                    />
                </Col>
                <Col span={10}></Col>
                <Col span={4}>
                    {isLoggedIn ? (
                        <Dropdown overlay={menu}>
                            <Button>
                                <Space>
                                    Account
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    ) : (
                        <Button></Button>
                    )}
                </Col>
            </Row>
        </Header>
    );
}

export default TopBar;
