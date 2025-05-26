import React from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  MessageOutlined,
  UserOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function SidebarMenu({ collapsed, onCollapse }) {
  const menuItems = [
    { key: "1", icon: <MessageOutlined />, label: "New Chat" },
    { key: "2", icon: <SmileOutlined />, label: "Profile" },
    { key: "3", icon: <UserOutlined />, label: "Settings" },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={250}
      style={{
        background: "#001529",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 60,
          margin: 16,
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          userSelect: "none",
        }}
      >
        Ollama Chat
      </div>

      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={menuItems}
        style={{ flex: 1, borderRight: 0 }}
      />

      <div
        style={{
          padding: 16,
          textAlign: "center",
          fontSize: 12,
          color: "#888",
          userSelect: "none",
        }}
      >
        Powered by Ollama & Spring AI
      </div>
    </Sider>
  );
}
