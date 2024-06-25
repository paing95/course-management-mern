import axios from "axios";
// config
import {
    API_DOMAIN,
    API_URLS
} from '../../config/config';

// Get All Classes
const getAllClasses = async () => {
    const response = await axios.get(
        API_DOMAIN + API_URLS.GET_CLASSES
    );
    return response.data.results;
};

const classService = {
    getAllClasses
};

export default classService;