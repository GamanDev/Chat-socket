import React, { useState } from "react";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";

const socket = io.connect("http://localhost:8081");

const App = () => {
  const [room, setRoom] = useState(false);
  const [author, setAuthor] = useState("");
  const [roomAccept, setRoomAccept] = useState(false);

  function enterRoom() {
    socket.emit("join_room", room);
    setRoomAccept(true);
  }

  return (
    <div>
      {roomAccept ? (
        <ChatRoom room={room} author={author} socket={socket} />
      ) : (
        <form
          onSubmit={enterRoom}
          style={{
            textAlign: "center",
          }}>
          <div>
            <label htmlFor='room'>Room : </label>
            <input
              id='room'
              type='number'
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
              placeholder='Room number'
            />
          </div>
          <div>
            <label htmlFor='author'>Author : </label>
            <input
              id='author'
              type='text'
              placeholder='Ivan Bliminse...'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <button>Enter</button>
        </form>
      )}
    </div>
  );
};
export default App;
