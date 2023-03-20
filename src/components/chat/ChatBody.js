import React from 'react';
import { useSelector } from 'react-redux';

const ChatBody = ({ lastMessageRef, typingStatus }) => {
  const { userInfo } = useSelector((state) => state.user);
  const {messages} = useSelector((state)=>state.chat)
  
  return (
    <>
      <div className="message__container">
        {messages.map((msg) =>
          msg.name === userInfo.name ? (
            <div className="message__chats" key={msg.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{msg.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={msg.id}>
              <p className="recipient__name">{msg.name}</p>
              <div className="message__recipient">
                <p>{msg.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef} />
        
      </div>
      <div className="message__status">
          <p>{typingStatus}</p>
        </div>
    </>
  );
};

export default ChatBody;
