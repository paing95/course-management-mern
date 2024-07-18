// MUI
import { 
    Typography
} from "@mui/material";
// MUI Icons
import DateRangeIcon from '@mui/icons-material/DateRange';
// Libraries
import moment from 'moment';

const CourseDateElement = ({ datetime }) => {
    return (
        <Typography variant="body2" className="course-date">
            <DateRangeIcon /> &nbsp; {datetime ? moment(datetime).format('DD MMM YYYY') : ""}
        </Typography>
    )
};

export default CourseDateElement;