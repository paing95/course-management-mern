import { useEffect, useState } from "react";
// redux
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseCatalogs } from "../../features/course/courseCatalogSlice";
import { getActivities } from "../../features/activity/activitySlice";
import { createCourse } from '../../features/course/courseSlice';
// MUI
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    Paper,
    Select,
    TextField,
    Typography,
    MenuItem,
} from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// moment
import moment from "moment";
// import 'moment/locale/en';
// css
import "./Course.css";
import AlertElement from "../../components/AlertElement";
import Spinner from "../../components/Spinner";

const CreateCourse = () => {

    const allDays = [
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN"
    ];

    // redux
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { 
        catalogs,
        isLoading,
        isError, 
        message 
    } = useSelector((state) => state.courseCatalog);
    const {
        activities: allActivities,
        // isError: false,
        isLoading: isActivityLoading,
        // message: ''
    } = useSelector((state) => state.activity);
    const { course_detail, isLoading: isCourseLoading } = useSelector((state) => state.course);
    const { user } = useSelector(state => state.auth);

    // state
    const [courseId, setCourseId] = useState('');
    const [course, setCourse] = useState(null);
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());
    const [startTime, setStartTime] = useState(moment());
    const [endTime, setEndTime] = useState(moment());
    const [days, setDays] = useState([]);
    const [activities, setActivities] = useState([]);
    const [semester, setSemester] = useState('');
    const [errorMode, setErrorMode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // events
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (endDate < startDate) {
            setErrorMode('error');
            setErrorMsg('End date must be later than start date.');
            return;
        }

        if (endTime < startTime) {
            setErrorMode('error');
            setErrorMsg('End time must be later than start time.');
            return;
        }

        let code = course.code;
        let name = course.name;
        let start_datetime = startDate.format('YYYY-MM-DD') + " " + startTime.format('HH:mm:ss');
        let end_datetime = endDate.format('YYYY-MM-DD') + " " + endTime.format('HH:mm:ss');
        let lecturer = user.id;

        // console.log('=== DATA ===');
        // console.log('code:', code);
        // console.log('name:', name);
        // console.log('description:', description);
        // console.log('start_datetime:', start_datetime);
        // console.log('end_datetime:', end_datetime);
        // console.log('days:', days);
        // console.log('activities:', activities);
        // console.log('semester:', semester);
        // console.log('lecturer:', lecturer);

        dispatch(createCourse({
            code, 
            name, 
            description,
            start_datetime, 
            end_datetime,
            days, 
            lecturer,
            activities, 
            semester
        })).then((e) => {
            if (!e.error?.message) {
                setErrorMode('success');
                setErrorMsg('Course has been successfully created.');
                
                setTimeout(() => {
                    setErrorMode('');
                    setErrorMsg('');
                    navigate('/');
                }, 2000);
            } else {
                setErrorMode('error');
                setErrorMsg(e.error?.message);
            }
        });

    };

    useEffect(() => {
        dispatch(getCourseCatalogs());
        dispatch(getActivities());
    }, []);

    return (
        <Container maxWidth="sm">
            {(isLoading || isActivityLoading || isCourseLoading) && <Spinner />}
            <Paper>
                <form onSubmit={handleFormSubmit}>
                    <Box
                        sx={{
                            padding: '1em'
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom={true}
                            className="create-course-title"
                            sx={{ marginBottom: "1em" }}
                        >
                            Add a Course
                        </Typography>
                        <AlertElement 
                            mode={errorMode}
                            message={errorMsg}
                        />
                        <FormControl 
                            variant="outlined" 
                            sx={{
                                width: "100%",
                                marginTop: "1em"
                            }}
                        >
                            <InputLabel id="select-catalog-label">Course *</InputLabel>
                            <Select
                                required
                                labelId="select-catalog-label"
                                id="select-catalog"
                                value={courseId}
                                label="Classes *"
                                onChange={(e) => {
                                    setCourseId(e.target.value);
                                    const tmpCourse = catalogs.filter(x => x._id === e.target.value)[0];
                                    setCourse(tmpCourse);
                                    let desc = tmpCourse.description;
                                    setDescription(desc);
                                }}
                            >
                                {
                                    catalogs && catalogs.map((cat) => <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl 
                            variant="outlined" 
                            sx={{
                                width: "100%",
                                marginTop: "1em"
                            }}
                        >
                            <TextField
                                required
                                label="Description"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                width: "100%",
                                marginTop: "1em",
                                display: "flex",
                                flexFlow: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                                <DatePicker
                                    required
                                    label="Class Start Date *"
                                    format="YYYY-MM-DD"
                                    sx={{
                                        width: "48%"
                                    }}
                                    value={startDate}
                                    onChange={(value) => {
                                        console.log("Start Date on change:", value.toDate());
                                        setStartDate(moment(value.toDate()));
                                    }}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                                <DatePicker
                                    required
                                    label="Class End Date *"
                                    format="YYYY-MM-DD"
                                    sx={{
                                        width: "48%"
                                    }}
                                    value={endDate}
                                    onChange={(value) => {
                                        console.log("End Date on change:", value.toDate());
                                        setEndDate(moment(value.toDate()));
                                    }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl
                            sx={{
                                width: "100%",
                                marginTop: "1em",
                                display: "flex",
                                flexFlow: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                                <TimePicker
                                    required
                                    label="Class Start Time *"
                                    // format="hh:mm"
                                    sx={{
                                        width: "48%"
                                    }}
                                    ampm={false}
                                    value={startTime}
                                    onChange={(value) => {
                                        console.log("Start Time on change:", value.toDate());
                                        setStartTime(moment(value.toDate()));
                                    }}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                                <TimePicker
                                    required
                                    label="Class End Time *"
                                    // format="hh:mm"
                                    sx={{
                                        width: "48%"
                                    }}
                                    ampm={false}
                                    value={endTime}
                                    onChange={(value) => {
                                        console.log("End Time on change:", value.toDate());
                                        setEndTime(moment(value.toDate()));
                                    }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl 
                            sx={{
                                width: "100%",
                                marginTop: "1em"
                            }}>
                            <InputLabel id="days-label">Days</InputLabel>
                            <Select
                                required
                                labelId="days-label"
                                value={days}
                                label="Days"
                                multiple={true}
                                onChange={(e) => {
                                    setDays(e.target.value);
                                }}
                            >
                                {
                                    allDays.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl 
                            sx={{
                                width: "100%",
                                marginTop: "1em"
                            }}>
                            <InputLabel id="activities-label">Activities</InputLabel>
                            <Select
                                required
                                labelId="activities-label"
                                value={activities}
                                label="Activities"
                                multiple={true}
                                onChange={(e) => {
                                    setActivities(e.target.value);
                                }}
                            >
                                {
                                    allActivities.map((d) => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl 
                            variant="outlined" 
                            sx={{
                                width: "100%",
                                marginTop: "1em"
                            }}
                        >
                            <TextField
                                required
                                label="Semester"
                                rows={4}
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            />
                        </FormControl>

                        <FormControl 
                            variant="outlined" 
                            sx={{
                                width: "100%",
                                marginTop: "1em"
                            }}
                        >
                            <Button 
                                variant="contained"
                                type="Submit"
                                disabled={isLoading || isActivityLoading || isCourseLoading}
                            >Submit</Button>
                        </FormControl>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
};

export default CreateCourse;