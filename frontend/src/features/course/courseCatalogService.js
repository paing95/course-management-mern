import axios from "axios";
// config
import {
    API_DOMAIN,
    API_URLS
} from "../../config/config";

// Get All Course Catalogs
const getAllCourseCatalogs = async () => {
    const loginUser = JSON.parse(localStorage.getItem('course-mgmt-user'));
    const response = await axios.get(
        API_DOMAIN + API_URLS.GET_COURSE_CATALOGS,
        {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token
            }
        }
    );
    return response.data.results;
};

const courseCatalogService = {
    getAllCourseCatalogs
};

export default courseCatalogService;