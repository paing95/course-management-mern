// MUI
import { 
    Avatar,
    Tooltip,
} from "@mui/material";
// MUI Colors
import { green, grey, indigo, purple, red, teal } from '@mui/material/colors';

const CourseDayElement = ({ dayOfWeek }) => {

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
    };

    return (
        <Tooltip 
            title={dayToLongTermMapping(dayOfWeek)}
            arrow
            slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -10],
                      },
                    },
                  ],
                },
            }}
        >
            <Avatar sx={{ bgcolor: dayColorMapping(dayOfWeek) }}>{dayOfWeek[0]}</Avatar>
        </Tooltip>
    )
};

export default CourseDayElement;