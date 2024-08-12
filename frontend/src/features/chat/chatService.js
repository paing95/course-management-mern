import axios from "axios";
// config
import {
    API_DOMAIN,
    API_URLS
} from '../../config/config';

// Add new chat
const addChat = async (data) => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.post(
        API_DOMAIN + API_URLS.GET_CHATS,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token
            }
        }
    );
    return response.data.results;
};

// Get Chats by Room ID
const getChatsByRoomId = async (room_id) => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.get(
        API_DOMAIN + API_URLS.GET_CHATS + "?room=" + room_id,
        {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token
            }
        }
    );
    return response.data.results;
};

const chatService = {
    addChat,
    getChatsByRoomId
};

export default chatService;