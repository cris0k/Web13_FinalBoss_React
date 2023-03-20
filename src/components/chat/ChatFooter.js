import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChatFooter = ({ socket }) => {
  const [msg, setMsg] = useState('')
  const { userInfo } = useSelector((state) => state.user);

  const handleTyping = () =>
    socket.emit('typing', `${userInfo.name} is typing...`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (msg.trim() && userInfo.name) {
        socket.emit('message', {
          text: msg,
          name: userInfo.name,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id
        });
      }
    setMsg('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;