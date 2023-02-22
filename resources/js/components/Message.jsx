import React from 'react'

function Message({message,right}) {
  const padTo2Digits = (num) => {
        return String(num).padStart(2, '0');
      }
      
  return (
   <>
   {right ? ( <li className="chat-right">
   <div className="chat-hour">{ padTo2Digits(new Date(message.created_at).getHours()) + ':' +  padTo2Digits(new Date(message.created_at).getMinutes())}<span className="fa fa-check-circle"></span></div>
   <div className="chat-text">{message.message}</div>
   <div className="chat-avatar">
       <img src={`/images/${message.user.image}`} alt="Retail Admin"/>
       <div className="chat-name">{message.user.name}</div>
   </div>
 </li>): (<li  className="chat-left">
 <div className="chat-avatar">
     <img src={`/images/${message.user.image}`} alt="Retail Admin"/>
     <div className="chat-name">{message.user.name}</div>
 </div>
 <div className="chat-text">{message.message}</div>
 <div className="chat-hour">{ padTo2Digits(new Date(message.created_at).getHours()) + ':' +  padTo2Digits(new Date(message.created_at).getMinutes())}<span className="fa fa-check-circle"></span></div>
</li>)}
   </>
  )
}

export default Message