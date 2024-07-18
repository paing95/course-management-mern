import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// api
import { API_DOMAIN, API_URLS } from '../../config/config';
// redux
import { useSelector } from 'react-redux';
import { getActivities } from '../../features/activity/activitySlice';
import { getCourseDetail } from "../../features/course/courseSlice";
import { updateCourse } from '../../features/course/courseSlice';
import { uploadCourseFile } from '../../features/course/courseFileSlice';
// MUI
import { 
    Box,
    Button,
    Chip,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Link,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { grey, indigo } from '@mui/material/colors';
// component
import AlertElement from '../../components/AlertElement';
import CourseActivityChip from '../../components/course/CourseActivityChip';
import CourseDayElement from '../../components/course/CourseDayElement';
import CourseDateElement from '../../components/course/CourseDateElement';
import ConfirmDialog from '../../components/ConfirmDialog';
import CourseTimeElement from '../../components/course/CourseTimeElement';
import FileUploadDialog from '../../components/FileUploadDialog';
import Spinner from '../../components/Spinner';
// libraries
import moment from "moment";


const CourseDetails = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const courseId = location.search.replace('?id=', '');

    // redux state
    const { activities }  = useSelector(state => state.activity);
    const { user } = useSelector((state) => state.auth);
    const { course_detail, isLoading } = useSelector((state) => state.course);

    // state
    const [allActivities, setAllActivities] = useState([]);
    const [course, setCourse] = useState(null);
    const [courseActivities, setCourseActivities] = useState([]);
    const [activityFiles, setActivityFiles] = useState([]);

    // activity add & remove
    const [selectedActivity, setSelectedActivity] = useState('Select Activity');
    const [addActivityErrorMode, setAddActivityErrorMode] = useState("");
    const [addActivityErrorMessage, setAddActivityErrorMessage] = useState("");
    const [showAddActivityDialog, setShowAddActivityDialog] = useState(false);
    const [showDeleteActivityDialog, setShowDeleteActivityDialog] = useState(false);

    // files
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [uploadFileErrorMode, setUploadFileErrorMode] = useState("");
    const [uploadFileErrorMessage, setUploadFileErrorMessage] = useState("");

    // add activity dialog
    const AddActivityDialog = () => {
        return (
            <Modal
                open={showAddActivityDialog}
                onClose={() => setShowAddActivityDialog(false)}
            >
                <Box className="add-activity-modal">
                    {addActivityErrorMode && addActivityErrorMessage && <AlertElement 
                        mode={addActivityErrorMode}
                        message={addActivityErrorMessage}
                    />}
                    
                    <form onSubmit={handleSaveActivityClicked} className='add-activity-form'>
                        <Box className='add-activity-form-blk-widget'>
                            <InputLabel id="activity-list-label">Activity</InputLabel>
                            <Select
                                labelId="activity-list-label"
                                id="activity-list"
                                value={selectedActivity}
                                onChange={(e) => setSelectedActivity(e.target.value)}
                                sx={{ width: "300px" }}
                            >
                                <MenuItem disabled value="Select Activity">
                                    <em>Select Activity</em>
                                </MenuItem>
                                {allActivities.length > 0 && allActivities.map(act => <MenuItem key={act._id} value={act._id}>{act.name}</MenuItem>)}
                            </Select>
                        </Box>
                        <Box className='add-activity-form-blk-widget'>
                            <Button 
                                type='submit' 
                                variant='contained'
                                onClick={() => setShowAddActivityDialog(false)}
                                className="btn-grey"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type='submit' 
                                variant='contained'
                                onClick={handleSaveActivityClicked}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        )
    }

    // events
    const handleSaveActivityClicked = (e) => {
        e.preventDefault();

        let currentActivities = courseActivities.map(x => x._id);
        currentActivities.push(selectedActivity);
        
        dispatch(updateCourse({
            id: course._id,
            data: {
                activities: currentActivities
            }
        })).then((e) => {
            if (!e.error?.message) {
                setAddActivityErrorMode('success');
                setAddActivityErrorMessage('Activity has been successfully added.');
                
                setTimeout(() => {
                    dispatch(getCourseDetail({"id": courseId}));
                    setSelectedActivity('Select Activity');
                    setShowAddActivityDialog(false);
                    setAddActivityErrorMode('');
                    setAddActivityErrorMessage('');
                }, 2000);
            }
        });
    };

    const handleDeleteActivityClicked = () => {

        let filteredActivities = courseActivities.filter(x => x._id !== selectedActivity);
        
        dispatch(updateCourse({
            id: course._id,
            data: {
                activities: filteredActivities
            }
        })).then((e) => {
            if (!e.error?.message) {
                dispatch(getCourseDetail({"id": courseId}));
                setSelectedActivity('Select Activity');
                setShowDeleteActivityDialog(false);
            }
        });
    };

    const handleCourseFileUpload = (e, file) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('course_id', course._id);
        formData.append('activity_id', selectedActivity);

        dispatch(uploadCourseFile(formData)).then((e) => {
            if (!e.error?.message) {
                setUploadFileErrorMessage('File has been successfully uploaded.');
                setUploadFileErrorMode('success');
                
                setTimeout(() => {
                    setUploadFileErrorMessage('');
                    setUploadFileErrorMode('');
                    dispatch(getCourseDetail({"id": courseId}));
                    setShowFileUpload(false);
                }, 2000);
            }
        });
    }

    // useEffects
    useEffect(() => {
        if (course_detail) {
            setCourse(course_detail);
            setCourseActivities(course_detail.activities);
            let filteredCourseFiles = [];
            if (selectedActivity === "Select Activity") {
                filteredCourseFiles = course_detail.files.filter(
                    f => f.activity_id === course_detail.activities[0]._id
                );
                setSelectedActivity(course_detail.activities[0]._id);
            }
            else {
                filteredCourseFiles = course_detail.files.filter(
                    f => f.activity_id === selectedActivity
                );
            }
            console.log('filteredCourseFiles:', filteredCourseFiles);
            setActivityFiles(filteredCourseFiles);
        }
    }, [course_detail]);

    useEffect(() => {
        if (activities && activities.length > 0 && course_detail) {
            let currentActivities = [];
            if (course_detail && course_detail.activities) {
                currentActivities = course_detail.activities.map(x => x._id);
            }
            setAllActivities(activities.filter(x => !currentActivities.includes(x._id)));
        }
    }, [activities, course_detail])

    useEffect(() => {
        dispatch(getActivities());
        dispatch(getCourseDetail({"id": courseId}));
    }, []);

    return (
        <Box component={"div"}>
            {isLoading && <Spinner />}

            <AddActivityDialog />

            <ConfirmDialog
                message={"Are you sure you want to remove the activity?"}
                showDialog={showDeleteActivityDialog}
                handleYesClicked={handleDeleteActivityClicked}
                handleNoClicked={() => setShowDeleteActivityDialog(false)}
                handleCloseClicked={() => setShowDeleteActivityDialog(false)}
            />

            <Paper className="piller-blk" elevation={2}>
                <Typography variant="h5" className="course-list-title">
                    {course ? `${course.name} (${course.code})` : "Course Details"}
                </Typography>
                <Grid container sx={{ padding: '1em', paddingBottom: "0px" }}>
                    <Grid item md={6} xs={12}>
                        <Box 
                            component="fieldset" 
                            sx={{ height: "90% !important", display: "flex", alignItems: "center" }}
                        >
                            <legend className="course-details-blk-title">
                                Description
                            </legend>

                            <Typography variant='body1' className='course-description'>
                                <q>{course?.description}</q>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Box component="fieldset" sx={{ height: "90% !important", display: "flex", alignItems: "center" }}>
                            <legend className="course-details-blk-title">
                                Schedule
                            </legend>

                            <Grid container spacing={1} sx={{ paddingLeft: '0.5em', paddingRight: '0.5em', paddingTop: '0.5em' }}>
                                <Grid item xs={6} gap={1} sx={{ display: 'flex', flexFlow: "column" }}>
                                    <Typography variant="body2">
                                        <b>Taught By:</b> {course && `${course.lecturer.first_name} ${course.lecturer.last_name}`}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: '0.5em' }}>
                                        <b>Class Starts At:</b>
                                    </Typography>
                                    <CourseDateElement
                                        datetime={course && course.start_datetime ? course.start_datetime: new Date()}
                                    />
                                    <CourseTimeElement
                                        datetime={course && course.start_datetime ? course.start_datetime: new Date()}
                                    />
                                </Grid>
                                <Grid item xs={6} gap={1} sx={{ display: 'flex', flexFlow: "column" }}>
                                    <Typography variant="body2">
                                        <b>Semester:</b> {course && course.semester}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: '0.5em' }}>
                                        <b>Class Ends At:</b>
                                    </Typography>
                                    <CourseDateElement
                                        datetime={course && course.end_datetime ? course.end_datetime : new Date()}
                                    />
                                    <CourseTimeElement
                                        datetime={course && course.end_datetime ? course.end_datetime : new Date()}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ marginTop: '0.5em'}}>
                                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center !important' }}>
                                        <Typography variant="body2">
                                            <b>Class On:</b> 
                                        </Typography>
                                        {
                                            course && course.days && course.days.map(
                                                day => <CourseDayElement
                                                    key={day}
                                                    dayOfWeek={day}
                                                />
                                            )
                                        }
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{ padding: '1em', paddingTop: "0px" }}>
                    <Grid item xs={12}>
                        <Box 
                            component="fieldset" 
                            className="course-activity-list"
                        >
                            <legend className="course-details-blk-title">
                                Activities
                            </legend>

                            {courseActivities.map(
                                activity => <CourseActivityChip
                                    key={activity._id}
                                    activity={activity}
                                    selected={activity._id === selectedActivity}
                                    handleChipClicked={() => {
                                        let filteredCourseFiles = course.files.filter(
                                            f => f.activity_id === activity._id
                                        );

                                        setSelectedActivity(activity._id);
                                        setActivityFiles(filteredCourseFiles);
                                    }}
                                    handleDeleteClicked={() => {
                                        setSelectedActivity(activity._id);
                                        setShowDeleteActivityDialog(true);
                                    }}
                                    hideDelete={user && user.role !== "lecturer"}
                                />
                            )}

                            {user && user.role === "lecturer" && allActivities.length > 0 && <Chip 
                                icon={<AddIcon  sx={{ marginRight: "-20px !important" }}/>}
                                label="" 
                                onClick={() => {
                                    setSelectedActivity('Select Activity');
                                    setShowAddActivityDialog(true);
                                }} 
                            />}
                        
                            <FileUploadDialog
                                showDialog={showFileUpload} 
                                handleCloseClicked={() => setShowFileUpload(false)}
                                handleFileSubmit={handleCourseFileUpload}
                            >
                                {uploadFileErrorMode && uploadFileErrorMessage && <AlertElement 
                                    mode={uploadFileErrorMode}
                                    message={uploadFileErrorMessage}
                                />}
                            </FileUploadDialog>
                            <TableContainer sx={{ height: "300px" }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>File</TableCell>
                                        <TableCell align="right">Uploaded At</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user && user.role === "lecturer" && (
                                            <TableRow>
                                                <TableCell colSpan={3}>
                                                    <Box component={"div"} sx={{ display: "flex", justifyContent: "center"}}>
                                                        {user && user.role === "lecturer" && <Button 
                                                            sx={{ marginLeft: '1em' }} variant="contained"
                                                            onClick={() => setShowFileUpload(true)}
                                                        >Upload a new file</Button>}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {activityFiles && activityFiles.length === 0 && <TableCell colSpan={3}>
                                                    <Box component={"div"} sx={{ display: "flex", justifyContent: "center"}}>
                                                        There are no existing files.
                                                    </Box>
                                                </TableCell>}
                                        {activityFiles && activityFiles.map((activityFile) => (
                                            <TableRow
                                                key={activityFile.file_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Link 
                                                        href={API_DOMAIN + API_URLS.GET_ACTIVITY_FILES + activityFile.file_id + "?token=" + user.token}
                                                        target="_blank"
                                                        rel="noopener"
                                                    >{activityFile.file_name}</Link>
                                                </TableCell>
                                                <TableCell align="right">{moment(activityFile.upload_date).format('DD MMM YYYY hh:mm')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default CourseDetails;