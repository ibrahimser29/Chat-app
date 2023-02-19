import React, { useState, useEffect} from 'react'
import ChatsLeftSideBar from '../components/ChatsLeftSideBar'
import ChatsRightSideBar from '../components/ChatsRightSideBar'
import { useNavigate } from "react-router-dom";
import { sendRetrieveUsersRequest } from '../api/conversation/conversation'
function Chats() {
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);
    const [conversations,setConversations] = useState([]);
    const [errors,setErrors] = useState({});
    const getUsersAndConvetsations = () => {
        sendRetrieveUsersRequest().then((resp)=>{
            setUsers(resp.data.data.users)
            setConversations(resp.data.data.conversations)
        }).catch((error)=>{
            setErrors({...error,users:error.response.data.message})
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
                <h5 class="title">Chat App</h5>
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
                         errors={errors.users} />
                        <ChatsRightSideBar />
                    </div>
                </div>

            </div>

        </div>
    </div>

</div>
  )
}

export default Chats