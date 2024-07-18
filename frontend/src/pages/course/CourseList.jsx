import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { getCourses } from "../../features/course/courseSlice";
// MUI
import { Grid } from '@mui/material';
// components
import CourseCard from '../../components/course/CourseCard';
import Spinner from '../../components/Spinner';
// css
import './Course.css';

const CourseList = () => {

    const dispatch = useDispatch();
    const { courses, isLoading } = useSelector((state) => state.course);

    const [courseList, setCourseList] = useState([]);

    // useEffect
    useEffect(() => {
        if (courses && courses.length > 0) {
            setCourseList(courses);
        }
    }, [courses]);

    useEffect(() => {
        dispatch(getCourses());
    }, []);

    return (
        <Grid container spacing={1} sx={{ padding: '0.3em' }}>
            {isLoading && <Spinner />}

            {courseList.map(course => <Grid item lg={3} md={4} xs={12}>
                <CourseCard 
                    id={course._id}
                    title={course.name}
                    start_datetime={course.start_datetime}
                    end_datetime={course.end_datetime}
                    days={course.days}
                />
            </Grid>)}
        </Grid>
    )

}

export default CourseList;