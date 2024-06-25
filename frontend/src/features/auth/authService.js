import axios from 'axios';

// config
import {
    API_DOMAIN, API_URLS
} from "../../config/config"

// Register User
const register = async (userData) => {
    const response = await axios.post(
        API_DOMAIN + API_URLS.REGISTER_USER,
        userData
    );

    console.log('response ===> ', response)

    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(
        API_DOMAIN + API_URLS.LOGIN_USER,
        userData
    );

    if (response.data) {
        localStorage.setItem(
            'course-mgmt-user', 
            JSON.stringify(response.data.results)
        )
    }

    return response.data;
}

const authService = {
    register,
    login
}

export default authService;