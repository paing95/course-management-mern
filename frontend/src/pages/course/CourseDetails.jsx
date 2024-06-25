// MUI
import { 
    Avatar,
    Box,
    Button,
    Grid,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

// MUI Colors
import { green, grey, indigo, purple, red, teal } from '@mui/material/colors';

// MUI Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';

// libraries
import moment from 'moment';

// css
import './Course.css';

const CourseDetails = ({ start_datetime, end_datetime, days }) => {

    const dayColorMapping = (day) => {
        switch(day) {
            case "MON":
                return red[500]
            case "TUE":
                return purple[500]
            case "WED":
                return indigo[500]
            case "THU":
                return teal[500]
            case "FRI":
                return green[500]
            default:
                return grey[500]
        }
    };

    const dayToLongTermMapping = (day) => {
        switch(day) {
            case "MON":
                return "Monday"
            case "TUE":
                return "Tuesday"
            case "WED":
                return "Wednesday"
            case "THU":
                return "Thursday"
            case "FRI":
                return "Friday"
            default:
                return day
        }
    }

    const CourseDateElement = ({ datetime }) => {
        return (
            <Typography variant="body2" className="course-date">
                <DateRangeIcon />{datetime ? moment(datetime).format('DD MMM YYYY') : ""}
            </Typography>
        )   
    };

    const CourseTimeElement = ({ datetime }) => {
        return (
            <Typography variant="body2" className="course-date">
                <AccessTimeIcon />{datetime ? moment(datetime).format('hh:mm') : ""}
            </Typography>
        )   
    };

    const CourseDayElement = ({ dayOfWeek }) => {
        return (
            <Tooltip title={dayToLongTermMapping(dayOfWeek)}>
                <Avatar sx={{ bgcolor: dayColorMapping(dayOfWeek) }}>{dayOfWeek[0]}</Avatar>
            </Tooltip>
        )
    };

    return (
        <Box className="course-details-blk" component="fieldset">
            <legend className="course-details-blk-title">
                Schedule
            </legend>

            <Grid container spacing={1}>
                <Grid item xs={6} gap={1} sx={{ display: 'flex', flexFlow: "column" }}>
                    <Typography variant="body2">
                        <b>Class Starts At:</b>
                    </Typography>
                    <CourseDateElement
                        datetime={start_datetime}
                    />
                    <CourseTimeElement
                        datetime={start_datetime}
                    />
                </Grid>
                <Grid item xs={6} gap={1} sx={{ display: 'flex', flexFlow: "column" }}>
                    <Typography variant="body2">
                        <b>Class Ends At:</b>
                    </Typography>
                    <CourseDateElement
                        datetime={end_datetime}
                    />
                    <CourseTimeElement
                        datetime={end_datetime}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '0.8em'}}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center !important' }}>
                    <Typography variant="body2">
                        <b>You Have Class On:</b> 
                    </Typography>
                    {
                        days && days.map(
                            day => <CourseDayElement
                                key={day}
                                dayOfWeek={day}
                            />
                        )
                    }
                </Stack>
            </Grid>
        </Box>
    )
};

export default CourseDetails;