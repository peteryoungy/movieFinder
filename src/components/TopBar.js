import React, { useEffect } from "react";
import { Layout, Input, Row, Col, Button, Menu, Dropdown, Space } from "antd";
import { SearchOutlined, AudioOutlined, DownOutlined, WindowsFilled } from "@ant-design/icons";
import SearchBar from "./SearchBar";


const { Header} = Layout;

// const suffix = (
//     <AudioOutlined
//         style={{
//             fontSize: 16,
//             color: "#000000",
//         }}
//     />
// );

function TopBar(props) {
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
    
    const menu = <Menu onClick={handleMenuClick} items={items} />;

    function handleMenuClick(e) {
        console.log("click", e);

        if(e.key === '1'){
            window.location.href = '/likes'
        }

        if(e.key === '2'){
            // todo: set logout
        }
    }

    useEffect(()=> {
        console.log("Did Mount.")
        const title = document.getElementById('title')

        title.addEventListener('pointerenter', () => {
            title.classList.add('pointer')
        })

        title.addEventListener('click', () => {
            window.location.href = "/"
        })

        return ()=>{
            // todo: give name
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
                            <Button type="primary">
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
