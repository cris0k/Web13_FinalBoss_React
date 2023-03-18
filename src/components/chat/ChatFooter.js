import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('')
  const { userInfo } = useSelector((state) => state.user);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userInfo.name) {
        socket.emit('message', {
          text: message,
          name: userInfo.name,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id
        });
        console.log(message);
      }
      setMessage('');
  };
  
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;