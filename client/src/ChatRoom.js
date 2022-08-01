import React, { useEffect, useState } from "react";

const ChatRoom = ({ room, author, socket }) => {
  const [text, setText] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);
  console.log(messagesReceived);

  async function sendMessage() {
    const messageObj = {
      room: room,
      author: author,
      message: text,
    };

    await socket.emit("send_message", messageObj);
    setMessagesReceived((prev) => [...prev, messageObj]);
    setText("");
  }

  useEffect(() => {
    const listener = (data) => {
      setMessagesReceived((prev) => [...prev, data]);
    };

    socket.on("receive_message", listener);

    return () => socket.off("receive_message", listener);
  }, [socket]);

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
        {messagesReceived.map((message) => {
          return (
            <div className='chatWindow'>
              <div className={author === message.author ? "You" : "NotYou"}>
                {message.message}
                <div className='author'>Written by : {message.author}</div>
              </div>
            </div>
          );
        })}
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
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessage} style={{ marginLeft: "auto" }}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
