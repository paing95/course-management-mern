import { useState } from "react";
// MUI
import { 
    Box, 
    Button,
    Modal,
    Typography 
} from "@mui/material";

const FileUploadDialog = ({ showDialog, handleCloseClicked, handleFileSubmit, children  }) => {

    const [uploadedFile, setUploadedFile] = useState(null);

    return (
        <Modal
            open={showDialog}
            onClose={handleCloseClicked}
        >
            <Box className="course-file-upload-modal">
                {children}
                <form onSubmit={(e) => handleFileSubmit(e, uploadedFile)} className='course-file-upload-form'>
                    <Typography variant='body2' sx={{ flexGrow: '1'}}>
                        File: <input type='file' name='file' onChange={(e) => setUploadedFile(e.target.files[0])} />
                    </Typography>
                    <Button type='submit' variant='contained'>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    )
};

export default FileUploadDialog;