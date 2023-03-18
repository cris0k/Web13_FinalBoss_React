import React from 'react';
import { useSelector } from 'react-redux';

const ChatBody = ({ messages }) => {
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
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
