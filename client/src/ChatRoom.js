import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";

const ChatRoom = ({ room, author, socket }) => {
  // const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
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

  return (
    <div>
      <h2 className="pt-20 text-white">Chat Window</h2>
      <div className="mt-2 text-white">Room number - {room}</div>
      <div className="w-96 h-96 overflow-y-scroll border-4 border-lightfray-200 mt-20 mx-auto bg-teal-200/20">
        <Message messages={messages} author={author} />
      </div>
      <div className="w-96 h-15 my-0 mx-auto flex border-4 box-border shadow-2xl">
        <input
          type="text"
          className="w-full"
          // value={text}
          // onChange={(e) => setText(e.target.value)}
          ref={inputText}
        />
        <button onClick={sendMessage} className="bg-teal-300">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
