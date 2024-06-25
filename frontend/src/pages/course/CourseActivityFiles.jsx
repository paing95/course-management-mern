import { useEffect, useState } from 'react';
// redux
import { useSelector, useDispatch } from "react-redux";
import { uploadCourseFile } from "../../features/course/courseFileSlice";
import { getCourses } from "../../features/course/courseSlice";
// config
import {
    API_DOMAIN, API_URLS
} from "../../config/config";
// MUI
import { 
    Alert,
    Box,
    Button,
    IconButton,
    Link,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
// MUI Icons
import DownloadIcon from '@mui/icons-material/Download';
// components
import Spinner from '../../components/Spinner';
// libraries
import moment from "moment";

const CourseActivityFiles = ({ course, activity }) => {
    
    // redux stuff
    const dispatch = useDispatch();
    const { isLoading, isError, message }  = useSelector(state => state.courseFile);
    const { user } = useSelector(state => state.auth);

    // state
    const [errorMode, setErrorMode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openUploadForm, setOpenUploadForm] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    // filter files with activity
    const activityFiles = course.files ? course.files.filter(
        x => x.activity_id === activity._id
    ).sort((a,b) => {
        if (moment(a.upload_date) > moment(b.upload_date)) {
            return -1;
        } else if (moment(a.upload_date) < moment(b.upload_date)) {
            return 1;
        }
        return 0
    }) : [];

    // events
    const handleFileSubmit = (e) => {
        e.preventDefault();

        // console.log("=== On File Submit ===");
        // console.log(uploadedFile);
        // console.log(course);
        // console.log(activity);
        // console.log("=== End Of File Submit ===");
        // return;

        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('course_id', course._id);
        formData.append('activity_id', activity._id);

        dispatch(uploadCourseFile(formData)).then((e) => {
            if (!e.error?.message) {
                setErrorMessage('File has been successfully uploaded.');
                setErrorMode('success');
                
                setTimeout(() => {
                    setErrorMessage('');
                    setErrorMode('');
                    dispatch(getCourses());
                    setOpenUploadForm(false);
                }, 2000);
            }
        });
    };

    useEffect(() => {
        if (isError && message) {
            setErrorMessage(message);
            setErrorMode('error');
        }
    }, [isError, message])

    return (
        <Box className="course-details-blk-below" component="fieldset">
            {isLoading && <Spinner />}
            <legend className="course-details-blk-title">
                {activity && activity.name} Files {user && user.role === "lecturer" && <Button 
                    sx={{ marginLeft: '1em' }} variant="contained"
                    onClick={() => setOpenUploadForm(true)}
                >Upload</Button>}
            </legend>

            <Modal
                open={openUploadForm}
                onClose={() => setOpenUploadForm(false)}
            >
                <Box className="course-file-upload-modal">
                    {(errorMode && errorMessage) && <Alert variant="filled" severity={errorMode} className="alert-blk">
                        {errorMessage}
                    </Alert>}
                    <form onSubmit={handleFileSubmit} className='course-file-upload-form'>
                        <Typography variant='body2' sx={{ flexGrow: '1'}}>
                            File: <input type='file' name='file' onChange={(e) => setUploadedFile(e.target.files[0])} />
                        </Typography>
                        <Button type='submit' variant='contained'>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>

            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>File</TableCell>
                        <TableCell align="right">Uploaded At</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {activityFiles.map((activityFile) => (
                        <TableRow
                        key={activityFile.file_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {activityFile.file_name}
                            </TableCell>
                            <TableCell align="right">{moment(activityFile.upload_date).format('DD MMM YYYY hh:mm')}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="download">
                                    <Link 
                                        href={API_DOMAIN + API_URLS.GET_ACTIVITY_FILES + activityFile.file_id + "?token=" + user.token}
                                        target="_blank"
                                        rel="noopener"
                                    ><DownloadIcon /></Link>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    )
};

export default CourseActivityFiles;