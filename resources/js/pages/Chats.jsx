import React, { useState, useEffect} from 'react'
import ChatsLeftSideBar from '../components/ChatsLeftSideBar'
import ChatsRightSideBar from '../components/ChatsRightSideBar'
import { useNavigate } from "react-router-dom";
import { sendRetrieveUsersRequest } from '../api/conversation/conversation'
import { sendStartConversationRequest } from '../api/conversation/conversation';
function Chats() {
    console.log('render chatss')
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);
    const [conversations,setConversations] = useState([]);
    const [conversation,setConversation] = useState({});
    const [selectedUser,setSlectedUser] = useState({});
    const [errors,setErrors] = useState({});
    const getUsersAndConvetsations = () => {
        sendRetrieveUsersRequest().then((resp)=>{
            setUsers(resp.data.data.users)
            setConversations(resp.data.data.conversations)
        }).catch((error)=>{
            setErrors({...error,users:error.response.data.message})
        })
    }
    const startConversation = (user) => {
        setSlectedUser(user)
        sendStartConversationRequest(user.id).then((resp)=>{
            setConversation(resp.data.data.conversation)
        }).catch((error)=>{
            setErrors({...error,conversation:error.response.data.message})
        })
    }
    useEffect(()=>{
        if(localStorage.getItem('user') == null || localStorage.getItem('user') == undefined){
            navigate('/')
        }
        getUsersAndConvetsations();
    },[])
  return (
    <div class="container">
    <div class="page-title">
        <div class="row gutters">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <h5 class="title">Chat App {errors.pusher != undefined && errors.pusher }</h5>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
        </div>
    </div>

    <div class="content-wrapper">


        <div class="row gutters">

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                <div class="card m-0">

                    <div class="row no-gutters">
                        <ChatsLeftSideBar users={users} conversations={conversations}
                         errors={errors.users} startConversation={startConversation} />
                         
                        <ChatsRightSideBar
                        selectedUser={selectedUser}
                         conversation={conversation} errors={errors.conversation} />
                    </div>
                </div>

            </div>

        </div>
    </div>

</div>
  )
}

export default Chats