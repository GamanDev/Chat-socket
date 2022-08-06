import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";

const ChatRoom = ({ room, author, socket }) => {
  // const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const inputText = useRef(null);

  const addMessage = useCallback(
    (msg) => setMessages((state) => [...state, msg]),
    []
  );

  async function sendMessage() {
    const msg = {
      room: room,
      author: author,
      message: inputText.current.value,
      // message: text,
    };
    if (msg.message) {
      socket.emit("send_message", msg);
      addMessage(msg);
      // setText("");
      inputText.current.value = "";
    }
  }

  useEffect(() => {
    socket.on("receive_message", addMessage);

    return () => socket.off("receive_message", addMessage);
  }, [socket]);

  function onRefButtonClick() {
    console.log(refButton.current.value);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Chat Window</h2>
      <div>Room number - {room}</div>
      <div
        style={{
          width: "400px",
          height: "400px",
          overflowY: "scroll",
          border: "2px solid lightgray",
          margin: "0 auto",
        }}>
        <Message messages={messages} author={author} />
      </div>
      <div
        style={{
          width: "405px",
          height: "50px",
          margin: "0 auto",
          display: "flex",
        }}>
        <input
          type='text'
          style={{ width: "100%" }}
          // value={text}
          // onChange={(e) => setText(e.target.value)}
          ref={inputText}
        />
        <button onClick={sendMessage} style={{ marginLeft: "auto" }}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
