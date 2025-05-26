import React, { useEffect, useRef } from "react";
import { Avatar, Typography } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function ChatLog({ messages }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        flexGrow: 1,
        overflowY: "auto",
        paddingRight: 16,
        paddingLeft: 16,
        marginBottom: 12,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {messages.map((msg, idx) => {
        const isUser = msg.sender === "user";

        return (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: isUser ? "row-reverse" : "row",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <Avatar
              size={40}
              icon={isUser ? <UserOutlined /> : <RobotOutlined />}
              style={isUser ? { backgroundColor: "#1890ff" } : { backgroundColor: "#d9d9d9" }}
            />
            <div
              style={{
                maxWidth: "70%",
                backgroundColor: isUser ? "#1890ff" : "#f5f5f5",
                color: isUser ? "white" : "black",
                padding: "12px 18px",
                borderRadius: 20,
                borderTopRightRadius: isUser ? 0 : 20,
                borderTopLeftRadius: isUser ? 20 : 0,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: 15,
                lineHeight: 1.4,
              }}
            >
              {msg.text}
              {msg.time && (
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 11,
                    color: isUser ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.35)",
                    textAlign: isUser ? "right" : "left",
                    userSelect: "none",
                  }}
                >
                  {msg.time}
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}
