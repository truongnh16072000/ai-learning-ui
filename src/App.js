import React, { useState, useRef } from "react";
import { Layout } from "antd";

import SidebarMenu from "./components/SidebarMenu";
import ChatHeader from "./components/ChatHeader";
import ChatLog from "./components/ChatLog";
import ChatInput from "./components/ChatInput";

const { Content } = Layout;

export default function ChatApp() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const eventSourceRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    // Close previous SSE connection if exists
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
  
    setChatLog((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);
  
    const eventSource = new EventSource(`http://localhost:8080/chat-stream?message=${encodeURIComponent(input)}`);
    eventSourceRef.current = eventSource;
  
    let botMessage = "";
  
    eventSource.onmessage = (event) => {
      const chunk = event.data; // avoid adding space
      if (botMessage && !botMessage.endsWith(' ') && !chunk.startsWith(' ')) {
        botMessage += ' ';
      }

      botMessage += chunk;
  
      setChatLog((prev) => {
        const last = prev[prev.length - 1];
        if (last?.sender === "bot") {
          return [...prev.slice(0, -1), { sender: "bot", text: botMessage }];
        } else {
          return [...prev, { sender: "bot", text: botMessage }];
        }
      });
    };
  
    eventSource.onerror = (err) => {
      console.error("SSE error", err);
      eventSource.close();
      setLoading(false);
    };
  
    eventSource.addEventListener("end", () => {
      setLoading(false);
      eventSource.close();
    });
  
    setInput("");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <SidebarMenu collapsed={collapsed} onCollapse={setCollapsed} />

      <Layout>
        <ChatHeader />

        <Content
          style={{
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
            backgroundColor: "#fafafa",
          }}
        >
          <ChatLog messages={chatLog} />
          <ChatInput input={input} setInput={setInput} onSend={sendMessage} loading={loading} />
        </Content>
      </Layout>
    </Layout>
  );
}
