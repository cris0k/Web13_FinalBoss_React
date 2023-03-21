import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "../../style/chat.css"
import { useEffect, useRef, useState } from "react";
import { message } from "../../store/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatPage =({socket})=>{
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null)
  const dispatch = useDispatch()
  const {messages} = useSelector((state)=>state.chat)
  

  useEffect(() => {
    socket.on('messageResponse', (data) => dispatch(message([...messages, data])))}
  , [socket, dispatch,messages]);

  useEffect(() => {
    // scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

    return (
        <div className="chat">
          <ChatBar socket={socket}/>
          <div className="chat__main">
            <ChatBody 
            messages={messages} 
            typingStatus={typingStatus} 
            lastMessageRef={lastMessageRef}/>
            <ChatFooter socket={socket} />
          </div>
        </div>
      );
}

export default ChatPage