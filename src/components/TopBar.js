import React, { useEffect } from "react";
import { Layout, Input, Row, Col, Button, Menu, Dropdown, Space } from "antd";
import { SearchOutlined, AudioOutlined, DownOutlined } from "@ant-design/icons";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SearchBar from "./SearchBar";


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
    const isLoggedIn = false;

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

    useEffect(()=> {
        console.log("Did Mount.")
        const title = document.getElementById('title')

        title.addEventListener('pointerenter', () => {
            title.classList.add('title-hover')
        })

        title.addEventListener('click', () => {
            window.location.href = "/"
        })

        return ()=>{
            title.removeEventListener('pointerenter')
            title.removeEventListener('click')
        }

    }, [])

    return (
        <Header>
            <Row justify="space-between">
                <Col span={10} className="midd">
                    <div id="title"> MovieFinder! </div>
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
                        <Dropdown overlay={menu}>
                            <Button>
                                <Space>
                                    Account
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    ) 
                    : 
                    (   
                        <Space>
                            <Button type="link" onClick={() => {window.location.href="/login"}}> Sign In</Button>
                            <Button type="primary" onClick={() => {window.location.href="/register"}}> Sign Up</Button>
                        </Space>
                        
                    )
                    }
                </Col>
            </Row>
        </Header>
    );
}

export default TopBar;
