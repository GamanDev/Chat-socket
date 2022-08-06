import React from "react";

const Message = ({ messages, author }) => {
  return (
    <div>
      {messages.map((message) => {
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
  );
};

export default Message;
