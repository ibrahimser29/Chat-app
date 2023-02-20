import React, { useReducer, useEffect} from 'react'
import ChatsLeftSideBar from '../components/ChatsLeftSideBar'
import ChatsRightSideBar from '../components/ChatsRightSideBar'
import { useNavigate } from "react-router-dom";
import { sendRetrieveUsersRequest } from '../api/conversation/conversation'
import { sendStartConversationRequest } from '../api/conversation/conversation';
function Chats() {
    const navigate = useNavigate();
    const initialState = {
         loading: true,
         users:[],
         conversations:[],
         conversation:{},
         selectedUser:{},
         errors:[]
        };
    function reducer(state, action) {
        switch (action.type) {
        case 'SET_LOADING':
            return {...state,loading:action.payload};
        case 'SET_USERS':
            return {...state,users:action.payload};
        case 'SET_CONVERSATIONS':
            console.log('paload'+action.payload)
            return {...state,conversations:action.payload};
        case 'SET_CONVERSATION':
            return {...state,conversation:action.payload};
        case 'SET_SELECTED_USER':
            return {...state,selectedUser:action.payload};
        case 'SET_ERRORS':
            return {...state,errors:action.payload};
        default:
            return state;
        }
    }
          
    const [state, dispatch] = useReducer(reducer, initialState);
    const getUsersAndConvetsations = () => {
        sendRetrieveUsersRequest().then((resp)=>{
            dispatch({type:'SET_CONVERSATIONS',payload:resp.data.data.conversations});
            dispatch({type:'SET_USERS',payload:resp.data.data.users});
        }).catch((error)=>{
            dispatch({type:'SET_ERRORS',payload:{...state.errors,payload:error.response.data.message}});
        }).finally(()=>{
            dispatch({type:'SET_LOADING',payload:false});
        })
    }
    const startConversation = (user) => {
        dispatch({type:'SET_SELECTED_USER',payload:user});
        sendStartConversationRequest(user.id).then((resp)=>{
            dispatch({type:'SET_CONVERSATION',payload:resp.data.data.conversation});
        }).catch((error)=>{
            dispatch({type:'SET_ERRORS',payload:{...state.errors,payload:error.response.data.message}});
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
                        {state.loading == true ? <div className="text-center loading-chats">Loading...</div> : (<>
                            <ChatsLeftSideBar users={state.users} conversations={state.conversations} 
                          errors={state.errors.users} startConversation={startConversation} />
                        <ChatsRightSideBar
                        selectedUser={state.selectedUser}
                         conversation={state.conversation} errors={state.errors.conversation} />
                        </>)}
                    </div>
                </div>

            </div>

        </div>
    </div>

</div>
  )
}

export default Chats