import React, { useEffect, useState } from 'react'
import { sendShowConversationRequest } from '../api/conversation/conversation';
function ChatsRightSideBar(props) {
 const [messages,setMessages] = useState([]);
 const [message,setMessage] = useState({});
 const [error,setError] = useState('');
 const getMessages = ()=>{
    sendShowConversationRequest(props.conversation.id).then((resp)=>{
        setMessages(resp.data.data.messages);
    }).catch((error)=>{
        setError(error.response.data.message)
    })
 }
 useEffect(() => { console.log("component updated"); });
 useEffect(()=>{
    getMessages();
 },[props.conversation])
  return (
    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                            <div className="selected-user">
                                <span>To: <span className="name">{props.selectedUser.name}</span></span>
                            </div>
                            <div className="chat-container">
                                <ul className="chat-box scrollContainer">
                                    {error != '' ? <div>{error}</div> :
                                     messages.length == 0 ? 'start chatting' : messages.map((message,i)=>{
                                        let sender = JSON.parse(localStorage.getItem('user')).id;
                                        console.log(sender);
                                      return  message.user_id ==  sender ? (<li key={i} className="chat-right">
                                     <div className="chat-hour">{new Date(message.created_at).getHours()}<span className="fa fa-check-circle"></span></div>
                                     <div className="chat-text">{message.message}</div>
                                     <div className="chat-avatar">
                                         <img src={`/images/${message.user.image}`} alt="Retail Admin"/>
                                         <div className="chat-name">{message.user.name}</div>
                                     </div>
                                 </li>) : (<li key={i} className="chat-left">
                                        <div className="chat-avatar">
                                            <img src={`/images/${message.user.image}`} alt="Retail Admin"/>
                                            <div className="chat-name">{message.user.name}</div>
                                        </div>
                                        <div className="chat-text">{message.message}</div>
                                        <div className="chat-hour">{new Date(message.created_at).getHours()}<span className="fa fa-check-circle"></span></div>
                                    </li>)
                                     })
                                     
                                    }
                                    
                                    
                                </ul>
                                <div className="form-group mt-3 mb-0">
                                    <textarea className="form-control" rows="3" placeholder="Type your message here..."></textarea>
                                </div>
                            </div>
                        </div>
  )
}

export default ChatsRightSideBar