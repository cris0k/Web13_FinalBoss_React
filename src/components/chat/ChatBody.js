import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ChatBody = ({ lastMessageRef, typingStatus }) => {
  const { userInfo } = useSelector((state) => state.user);
  const {messages} = useSelector((state)=>state.chat)
  const [t] = useTranslation("translation");
  
  return (
    <>
      <div className="message__container">
        {messages.map((msg) =>
          msg.name === userInfo.name ? (
            <div className="message__chats" key={msg.id}>
              <p className="sender__name">{t("You")}</p>
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
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </div>
      
    </>
  );
};

export default ChatBody;
