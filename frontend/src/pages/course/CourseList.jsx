import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { getCourses } from "../../features/course/courseSlice";

// components
import CourseActivity from './CourseActivity';
import CourseActivityFiles from './CourseActivityFiles';
import CourseDetails from './CourseDetails';
import Spinner from '../../components/Spinner';

// MUI
import { 
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Paper
} from "@mui/material";
import ClassIcon from '@mui/icons-material/Class';


// css
import './Course.css';

const CourseList = () => {

    const dispatch = useDispatch();
    
    const { courses, isLoading } = useSelector((state) => state.course);

    const [courseList, setCourseList] = useState([]);
    const [course, setCourse] = useState(null);
    const [activity, setActivity] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);

    // events
    const handleCourseListItemClicked = (c) => {
        setCourse(c);
        setActivity(c.activities[0]);
    };

    // useEffects
    useEffect(() => {
        if (courses && courses.length > 0) {
            if (firstLoad) {
                setCourseList(courses);
                setCourse(courses[0]);
                setActivity(courses[0].activities[0]);
                setFirstLoad(false);
            } else {
                setCourseList(courses);
                const findCourse = courses.filter(x => x._id === course._id)[0];
                setCourse(findCourse);
                setActivity(findCourse.activities.filter(x => x._id === activity._id)[0]);
            }
        }
    }, [courses]);

    useEffect(() => {
        dispatch(getCourses());
    }, []);
    

    return (
        <Grid container spacing={0.5}>
            
            {isLoading && <Spinner />}

            <Grid item lg={3} md={4} xs={12}>
                <Paper className="piller-blk-left" elevation={2}>
                    <Typography variant="h5" className="course-list-title">
                        Course List
                    </Typography>
                    <Divider sx={{ opacity: 0.5 }} />
                    <List>
                        {courseList && courseList.map(course => 
                        <ListItemButton
                            onClick={(e) => handleCourseListItemClicked(course)}
                            key={course._id}
                            className='course-list-item'
                        >
                            <ListItemIcon>
                                <ClassIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={course.name}
                                secondary={course.code}
                            />
                        </ListItemButton>)}
                    </List>
                </Paper>
            </Grid>
            <Grid item lg={9} md={8} xs={12}>
                <Paper className="piller-blk" elevation={2}>
                    <Typography variant="h5" className="course-list-title">
                        {course ? `${course.name} (${course.code})` : "Course Details"}
                    </Typography>
                    <Typography variant='body1' className='course-description'>
                        <q>{course?.description}</q>
                    </Typography>
                    <Grid container sx={{ padding: '1em' }}>
                        <Grid item xs={6}>
                            <Typography variant="body2">
                                <b>Taught By:</b> {course && `${course.lecturer.first_name} ${course.lecturer.last_name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">
                                <b>Semester:</b> {course && course.semester}
                            </Typography>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container className='piller-child-blk'>
                        <Grid item lg={6} md={12} xs={12}>
                            <CourseDetails
                                start_datetime={course ? course.start_datetime : ""}
                                end_datetime={course ? course.end_datetime : ""}
                                days={course ? course.days : []}
                            />
                        </Grid>
                        <Grid item lg={6} md={12} xs={12}>
                            <CourseActivity
                                course={course ? course : {}}
                                handleActivityClicked={(act) => setActivity(act)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className='piller-child-blk'>
                        <Grid item xs={12}>
                            <CourseActivityFiles
                                course={course ? course : {}}
                                activity={activity ? activity : {}}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CourseList;