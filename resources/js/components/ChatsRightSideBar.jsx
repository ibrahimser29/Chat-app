import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { sendShowConversationRequest } from '../api/conversation/conversation';
import { sendMessageRequest } from '../api/conversation/conversation';
import Pusher from 'pusher-js';
function ChatsRightSideBar(props) {
    console.log('render sidebar')
 const sender = JSON.parse(localStorage.getItem('user')).id;
 const [messages,setMessages] = useState([]);
 const [message,setMessage] = useState('');
 const [error,setError] = useState('');
 const padTo2Digits = (num) => {
    return String(num).padStart(2, '0');
  }
  const configurePusher = () => {
    console.log(messages)
    Pusher.logToConsole = true;

    var pusher = new Pusher('d359ae523485fe28ebcd', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('chat');
    channel.bind('new-message', function(message) {
        console.log(messages)
        //setMessages([...messages,message.message])
    });
  }
 const getMessages = ()=>{
    sendShowConversationRequest(props.conversation.id).then((resp)=>{
        setMessages(resp.data.data.messages);
    }).catch((error)=>{
        setError(error.response.data.message)
    })
 }
 const handelSendMessage = () => {
        sendMessageRequest(props.conversation.id,message).then((resp)=>{
            setMessage('')
        }).catch((error)=>{
            alert(error.response.data.message);
        })
 }
 const renderMessages = messages.length == 0 ? 'start chatting' : messages.map((message,i)=>{
    return message.user_id ==  sender ? (<li key={i} className="chat-right">
  <div className="chat-hour">{ padTo2Digits(new Date(message.created_at).getHours()) + ':' +  padTo2Digits(new Date(message.created_at).getMinutes())}<span className="fa fa-check-circle"></span></div>
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
     <div className="chat-hour">{ padTo2Digits(new Date(message.created_at).getHours()) + ':' +  padTo2Digits(new Date(message.created_at).getMinutes())}<span className="fa fa-check-circle"></span></div>
 </li>)
  })
 useEffect(()=>{
    getMessages();
 },[props.conversation])
 useEffect(()=>{
    configurePusher();
 },[messages])
  return (
    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                            {Object.keys(props.selectedUser).length == 0 ? (<div className="selected-user">
                                <span>Select User To Chat</span>
                            </div>) : (<><div className="selected-user">
                                <span>To: <span className="name">{props.selectedUser.name}</span></span>
                            </div>
                            <div className="chat-container">
                                <ul className="chat-box scrollContainer">
                                    {error != '' ? <div>{error}</div> : renderMessages }
                                    
                                    
                                </ul>
                                <div className="form-group mt-3 mb-0 d-flex align-items-center">
                                    <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className="form-control" rows="1" placeholder="Type your message here..."></textarea>
                                    <FontAwesomeIcon className='ml-2 text-primary' icon={faPaperPlane} onClick={()=>handelSendMessage()} />
                                </div>
                            </div></>)}
                            
                        </div>
  )
}

export default ChatsRightSideBar