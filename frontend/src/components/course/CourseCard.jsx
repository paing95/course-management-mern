import { useNavigate } from "react-router-dom"
// MUI
import { 
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
// Components
import CourseDateElement from "./CourseDateElement";
import CourseDayElement from "./CourseDayElement";
import CourseTimeElement from "./CourseTimeElement";
// css
import './CourseCard.css';

const CourseCard = ({ id, title, start_datetime, end_datetime, days, chat_room }) => {
    
    const navigate = useNavigate();

    return (
        <Card>
            <Tooltip 
                title={title} 
                arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -20],
                        },
                      },
                    ],
                  },
                }}
            >
                <CardHeader className="course-card-title" title={title}></CardHeader>
            </Tooltip>
            <CardContent>
                <Grid container spacing={1} sx={{ paddingLeft: '0.5em', paddingRight: '0.5em' }}>
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
                    <Grid item xs={12} sx={{ marginTop: '0.5em'}}>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center !important' }}>
                            <Typography variant="body2">
                                <b>Class On:</b> 
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
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => navigate(`/course?id=${id}`)}>
                    Details
                </Button>
                {chat_room && <Button size="small" color="primary" onClick={() => navigate(`/chat/${chat_room}`)}>
                    Chats
                </Button>}
            </CardActions>
        </Card>
    )
}

export default CourseCard;