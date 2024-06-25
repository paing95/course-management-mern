import axios from "axios";
// config
import {
    API_DOMAIN, API_URLS
} from "../../config/config";

// Upload a file
const UploadCourseFile = async (formData) => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.post(API_DOMAIN + API_URLS.GET_ACTIVITY_FILES, formData, {
        headers: {
            'Authorization': 'Bearer ' + loginUser.token,
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data.results;
}

const CourseFileService = {
    UploadCourseFile
};

export default CourseFileService;