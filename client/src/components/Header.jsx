import React from "react";
import { Layout, Menu } from 'antd';

const { Header} = Layout;

const Head = () => {
  return (
    <div>
       <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Users</Menu.Item>
      </Menu>
    </Header>
  </Layout>,
    </div>
  );
};

export default Head;




