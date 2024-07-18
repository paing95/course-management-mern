// MUI
import { 
    Typography
} from "@mui/material";
// MUI Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// Libraries
import moment from 'moment';

const CourseTimeElement = ({ datetime }) => {
    return (
        <Typography variant="body2" className="course-date">
            <AccessTimeIcon /> &nbsp; {datetime ? moment(datetime).format('hh:mm') : ""}
        </Typography>
    )   
};

export default CourseTimeElement;