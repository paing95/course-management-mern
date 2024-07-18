import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

const ConfirmDialog = ({ message, showDialog, handleYesClicked, handleNoClicked, handleCloseClicked }) => {
    return (
        <Dialog
            open={showDialog}
            onClose={handleCloseClicked}
        >
            <DialogTitle>
                Confirmation
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleNoClicked}>
                        No
                    </Button>
                    <Button onClick={handleYesClicked}>
                        Yes
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
};

export default ConfirmDialog;