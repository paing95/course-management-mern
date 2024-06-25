import { useState, useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getActivities } from "../../features/activity/activitySlice";
import { getCourses, updateCourse } from "../../features/course/courseSlice";
// MUI
import { 
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    OutlinedInput,
    Typography,
} from "@mui/material";
// components
import Spinner from "../../components/Spinner";
// css
import './Course.css'

const CourseActivity = (props) => {

    // redux stuff
    const dispatch = useDispatch();
    const { isError, message, isLoading } = useSelector(state => state.course);
    const { activities }  = useSelector(state => state.activity);
    const { user } = useSelector(state => state.auth);

    // state
    const [courseActivities, setCourseActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState('Select Activity');
    const [errorMode, setErrorMode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openAddActivity, setOpenAddActivity] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    // components
    const ChipElement = ({ activity, handleChipClicked, handleDeleteClicked }) => {
        return <Chip 
            label={activity.name} 
            variant="outlined" 
            onClick={() => handleChipClicked(activity)} 
            onDelete={() => handleDeleteClicked(activity)}
        />
    };

    // events
    const handleSaveActivityClicked = (e) => {
        e.preventDefault();

        let currentActivities = props.course.activities.map(x => x._id);
        currentActivities.push(selectedActivity);
        
        dispatch(updateCourse({
            id: props.course._id,
            data: {
                activities: currentActivities
            }
        })).then((e) => {
            if (!e.error?.message) {
                setErrorMessage('Activity has been successfully added.');
                setErrorMode('success');
                
                setTimeout(() => {
                    setErrorMessage('');
                    setErrorMode('');
                    dispatch(getCourses());
                    setSelectedActivity('Select Activity');
                    setOpenAddActivity(false);
                }, 2000);
            }
        });
    };

    const handleDeleteActivityClicked = () => {

        let currentActivities = props.course.activities.filter(x => x._id !== selectedActivity);
        
        dispatch(updateCourse({
            id: props.course._id,
            data: {
                activities: currentActivities
            }
        })).then((e) => {
            if (!e.error?.message) {
                dispatch(getCourses());
                setSelectedActivity('Select Activity');
                setOpenConfirmDialog(false);
            }
        });
    };

    // useEffects
    useEffect(() => {
        if (activities && activities.length > 0 && props.course.activities) {
            let currentActivities = [];
            if (props.course && props.course.activities) {
                currentActivities = props.course.activities.map(x => x._id);
            }
            setCourseActivities(activities.filter(x => !currentActivities.includes(x._id)));
        }
    }, [activities, props.course])

    useEffect(() => {
        if (isError && message) {
            setErrorMessage(message);
            setErrorMode('error');
        }
    }, [isError, message]);

    useEffect(() => {
        dispatch(getActivities());
    }, [])

    return (
        <Box className="course-details-blk" component="fieldset">

            {isLoading && <Spinner />}

            <legend className="course-details-blk-title">
                Activities {user && user.role === "lecturer" && <Button 
                    sx={{ marginLeft: '1em' }} variant="contained"
                    disabled={courseActivities.length > 0 ? false : true}
                    onClick={() => setOpenAddActivity(true)}
                >Add</Button>}
            </legend>

            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
            >
                <DialogTitle>
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove the activity?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setOpenConfirmDialog(false)}>
                            No
                        </Button>
                        <Button onClick={handleDeleteActivityClicked}>
                            Yes
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Modal
                open={openAddActivity}
                onClose={() => setOpenAddActivity(false)}
            >
                <Box className="add-activity-modal">
                    {(errorMode && errorMessage) && <Alert variant="filled" severity={errorMode} className="alert-blk">
                        {errorMessage}
                    </Alert>}
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
                                {courseActivities.length > 0 && courseActivities.map(act => <MenuItem key={act._id} value={act._id}>{act.name}</MenuItem>)}
                            </Select>
                        </Box>
                        <Box className='add-activity-form-blk-widget'>
                            <Button 
                                type='submit' 
                                variant='contained'
                                onClick={() => setOpenAddActivity(false)}
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

            <Box className="course-activity-list">
                {props.course && props.course.activities && props.course.activities.map(
                    activity => <ChipElement
                        key={activity._id}
                        activity={activity}
                        handleChipClicked={props.handleActivityClicked}
                        handleDeleteClicked={() => {
                            setSelectedActivity(activity._id);
                            setOpenConfirmDialog(true);
                        }}
                    />
                )}
            </Box>
        </Box> 
    )
};

export default CourseActivity;