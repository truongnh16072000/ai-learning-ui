import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

export default function ChatHeader() {
  return (
    <Header
      style={{
        padding: "0 24px",
        background: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        boxShadow: "0 2px 8px #f0f1f2",
        userSelect: "none",
      }}
    >
      Chat with LLM (llama3.2)
    </Header>
  );
}
