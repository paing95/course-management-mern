import axios from "axios";
// config
import {
    API_DOMAIN,
    API_URLS
} from "../../config/config";


// Get All Courses
const getAllCourses = async () => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.get(
        API_DOMAIN + API_URLS.GET_COURSES,
        {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token
            }
        }
    );
    return response.data.results;
};

// Create Course
const createCourse = async (data) => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.post(
        API_DOMAIN + API_URLS.GET_COURSES,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token
            }
        }
    );
    return response.data.results;
};

// Update Course
const updateCourse = async (id, data) => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.put(
        API_DOMAIN + API_URLS.GET_COURSES + id,
        data,
        {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token
            }
        }
    );
    return response.data.results;
};

// Get Course Detail
const getCourseDetail = async (id) => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.get(
        API_DOMAIN + API_URLS.GET_COURSES + id,
        {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token
            }
        }
    );
    return response.data.results;
}

const courseService = {
    getAllCourses,
    getCourseDetail,
    createCourse,
    updateCourse
};

export default courseService;