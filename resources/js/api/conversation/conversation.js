import api from '../api';
let url = '/conversations';
export const sendRetrieveUsersRequest = () => {
    return api.get(url);
}

export const sendShowConversationRequest = (conversationId) => {
    return api.get(url+`/${conversationId}/messages`);
}

export const sendStartConversationRequest = (userid) => {
    return api.get(url+`/${userid}`);
}
export const sendMessageRequest = (coversationId,message) => {
    
    return api.post(url+`/${coversationId}/send-message`,{message:message});
}