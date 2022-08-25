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
    <div className=" h-screen bg-slate-600 text-center ">
      {roomAccept ? (
        <ChatRoom room={room} author={author} socket={socket} />
      ) : (
        <form
          onSubmit={enterRoom}
          className="relative top-1/3 md:left-1/3 md:w-1/2 lg:w-1/3 sm:w-full  "
        >
          <div className="border-teal-400 rounded-lg border-4 p-4 drop-shadow-lg">
            <div className="p-3 flex justify-center">
              <label
                htmlFor="room"
                className="w-1/3 my-auto text-white sm:text-sm md:text-xl lg:text-2xl"
              >
                Room :{" "}
              </label>
              <input
                id="room"
                type="number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
                placeholder="Room number"
                className="text-center md:w-1/2 h-2 rounded-md p-6"
              />
            </div>
            <div className="p-3 flex justify-center">
              <label
                htmlFor="author"
                className="w-1/3 my-auto text-white sm:text-sm md:text-xl lg:text-2xl"
              >
                Author :{" "}
              </label>
              <input
                id="author"
                type="text"
                placeholder="Ivan Bliminse..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="text-center md:w-1/2 h-2 rounded-md p-6"
              />
            </div>
            <button className=" text-white bg-slate-800 w-20 h-9 rounded-lg">
              Enter
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default App;
