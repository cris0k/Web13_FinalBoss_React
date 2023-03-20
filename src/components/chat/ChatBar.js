
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../store/slices/chatSlice";

const ChatBar = ({ socket }) => {
  const { users } = useSelector((state)=>state.chat)
  const { userInfo }=useSelector((state)=>state.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    socket.on('newUserResponse', (data) => (dispatch(user(data))));
    
  }, [socket,users,dispatch]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName === userInfo.name ? 'me' : user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;