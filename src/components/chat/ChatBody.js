import React from 'react';
import { useSelector } from 'react-redux';

const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
  const { userInfo } = useSelector((state) => state.user);


  return (
    <>
      <div className="message__container">
        {messages.map((message) =>
          message.name === userInfo.name ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p className="recipient__name">{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
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
