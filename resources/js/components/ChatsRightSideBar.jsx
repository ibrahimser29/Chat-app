import React, { useEffect, useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { sendShowConversationRequest } from '../api/conversation/conversation';
import { sendMessageRequest } from '../api/conversation/conversation';
import Spinner from 'react-bootstrap/Spinner';
import Pusher from 'pusher-js';
import Message from './Message';
function ChatsRightSideBar(props) {
    let sender =  JSON.parse(localStorage.getItem('user')).id;
      let   user1_id =  props.conversation.user1_id;
       let user2_id = props.conversation.user2_id;
    const initialState = {
        loading: true,
        sending: false,//loader for sending new message
        messages:[],
        message:'',
        error:''
       };
   function reducer(state, action) {
       switch (action.type) {
       case 'SET_LOADING':
           return {...state,loading:action.payload};
       case 'SET_SENDING':
            return {...state,sending:action.payload};
       case 'SET_MESSAGES':
           return {...state,messages:action.payload};
       case 'SET_MESSAGE':
           return {...state,message:action.payload};
       case 'SET_ERROR':
           return {...state,errors:action.payload};
       default:
           return state;
       }
   }
         
 const [state, dispatch] = useReducer(reducer, initialState);

  const configurePusher = () => {
    Pusher.logToConsole = true;

    var pusher = new Pusher('d359ae523485fe28ebcd', {
      cluster: 'us2',
      authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
      auth: {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      },
    }
    });
    const channelName = 'private-chat.'+user1_id+'.'+user2_id;
    var channel = pusher.subscribe(channelName);
    channel.bind('new-message', function(message) {
        console.log(state.messages);
        getMessages();
    });
  }
 const getMessages = ()=>{
    sendShowConversationRequest(props.conversation.id).then((resp)=>{
        dispatch({type:'SET_MESSAGES',payload:resp.data.data.messages});
    }).catch((error)=>{
        dispatch({type:'SET_ERROR',payload:{...state.error,payload:error.response.data.message}});
    }).finally(()=>{
        dispatch({type:'SET_LOADING',payload:false});
    })
 }
 const handelSendMessage = () => {
        dispatch({type:'SET_SENDING',payload:true});
        sendMessageRequest(props.conversation.id,state.message).then((resp)=>{
            dispatch({type:'SET_MESSAGE',payload:''});
        }).catch((error)=>{
            alert(error.response.data.message);
        }).finally(()=>{
            dispatch({type:'SET_SENDING',payload:false});
        })
 }
 const renderMessages = state.messages.length == 0 ? 'start chatting' : state.messages.map((message,i)=>{
    return message.user_id ==  sender ? (<Message key={i} message={message} right={true} />) 
    : (<Message  key={i} message={message} right={false} />)
  })
 useEffect(()=>{
    getMessages();
    configurePusher();
 },[props.conversation])
  return (
    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                            {Object.keys(props.selectedUser).length == 0 ? (<div className="selected-user">
                                <span>Select User To Chat</span>
                            </div>) : (<><div className="selected-user">
                                <span>To: <span className="name">{props.selectedUser.name}</span></span>
                            </div>
                            <div className="chat-container">
                                <ul id='chat-box' className="chat-box scrollContainer">
                                    {state.loading ? <div>Loading...</div> : state.error != '' ? <div>{state.error}</div> : renderMessages }   
                                </ul>
                                <div className="form-group mt-3 mb-0 d-flex align-items-center">
                                    <textarea value={state.message} onChange={(e)=>dispatch({type:'SET_MESSAGE',payload:e.target.value})} className="form-control" rows="1" placeholder="Type your message here..."></textarea>
                                    {state.sending ? ( <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            </Spinner>) : (<FontAwesomeIcon className='ml-2 text-primary' icon={faPaperPlane} onClick={()=>handelSendMessage()} />)}
                                </div>
                            </div></>)}
                            
                        </div>
  )
}

export default ChatsRightSideBar