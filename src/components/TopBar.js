import React from 'react';
import { Layout, Search } from 'antd';


const { Header, Footer, Sider, Content } = Layout;
function TopBar(props) {
    return (
        <Header>

            Header
            <Search prefix={}/>
        </Header>
    );
}

export default TopBar;