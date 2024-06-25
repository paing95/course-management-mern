import axios from "axios";
// config
import {
    API_DOMAIN,
    API_URLS
} from '../../config/config';

// Get All Activities
const getAllActivities = async () => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.get(
        API_DOMAIN + API_URLS.GET_ACTIVITIES, {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token
            }
        }
    );
    return response.data.results;
};

// Create New Activity
const createActivity = async (data) => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.post(API_DOMAIN + API_URLS.GET_ACTIVITIES, data, {
        headers: {
            'Authorization': 'Bearer ' + loginUser.token
        }
    });
    return response.data.results;
}

const activityService = {
    getAllActivities,
    createActivity
};

export default activityService;