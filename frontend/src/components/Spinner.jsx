import {
    Backdrop,
    CircularProgress
} from "@mui/material";

const Spinner = () => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 10001 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
};

export default Spinner;