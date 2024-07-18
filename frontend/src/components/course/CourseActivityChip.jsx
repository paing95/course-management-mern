// MUI
import { 
    Chip
} from "@mui/material";
import { blue, grey, indigo } from "@mui/material/colors";
// css
import "./CourseActivityChip.css";

const CourseActivityChip = ({ activity, selected, handleChipClicked, handleDeleteClicked, hideDelete }) => {

    return (
        <>
            {hideDelete ? (
                <Chip 
                    className={`${selected ? "course-chip-selected": ""}`}
                    label={activity.name} 
                    variant="outlined" 
                    onClick={() => handleChipClicked(activity)} 
                />
            ): (
                <Chip 
                    className={`${selected ? "course-chip-selected": ""}`}
                    label={activity.name} 
                    variant="outlined" 
                    onClick={() => handleChipClicked(activity)} 
                    onDelete={() => handleDeleteClicked(activity)}
                />
            )}
        </>
    )
};

export default CourseActivityChip;