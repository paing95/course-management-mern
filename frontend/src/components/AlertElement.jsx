// MUI
import { Alert } from "@mui/material";

const AlertElement = ({ mode, message }) => {
    return (
        <Alert variant="filled" severity={mode} className="alert-blk">
            {message}
        </Alert>
    )
}

export default AlertElement;