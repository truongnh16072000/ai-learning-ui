import React from "react";
import { Input, Button } from "antd";

export default function ChatInput({ input, setInput, onSend, loading }) {
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <Input.Group compact>
      <Input
        style={{ width: "calc(100% - 100px)" }}
        placeholder="Type your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onEnterPress}
        disabled={loading}
      />
      <Button type="primary" onClick={onSend} loading={loading} disabled={loading}>
        Send
      </Button>
    </Input.Group>
  );
}
