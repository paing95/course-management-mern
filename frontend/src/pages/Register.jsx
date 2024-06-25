import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// redux actions
import { register } from "../features/auth/authSlice";
import { getClasses } from "../features/class/classSlice";

// MUI
import {
    Alert,
    Backdrop,
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    MenuItem,
    OutlinedInput,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

// components
import Spinner from "../components/Spinner";

// css
import './Register.css';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { 
        isLoading: classIsLoading,
        isError: classIsError,
        message: classMessage,
        classes
    } = useSelector(state => state.class);

    const { 
        isLoading: authIsLoading,
        isError: authIsError,
        message: authMessage
    } = useSelector(state => state.auth);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [roleDict, setRoleDict] = useState({});

    const [errorMode, setErrorMode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    // password flags
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleFormSubmit = (e) => {
        
        e.preventDefault();

        setErrorMessage('');
        setErrorMode('');

        console.log('firstName:', firstName);
        console.log('lastName:', lastName);
        console.log('password:', password);
        console.log('confirmPassword:', confirmPassword);
        console.log('selectedClass:', selectedClass);
        console.log('selectedRole:', selectedRole);

        if (!firstName || !lastName || !email || !password || !confirmPassword || selectedClass.length === 0 || !selectedRole) {
            setErrorMessage('All the required information must be filled.');
            setErrorMode('error');
            return;
        }

        if (confirmPassword !== password) {
            setErrorMessage('Passwords must match.');
            setErrorMode('error');
            return;
        }

        dispatch(register({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            role: selectedRole,
            classes: selectedClass
        }))
        .then(() => {
            setErrorMessage('Registration is successful. Please login.');
            setErrorMode('success');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        });
    };

    // useEffect

    useEffect(() => {

        if (password !== confirmPassword) {
            setPasswordError('Passwords does not match.');
        } else {
            setPasswordError('');
        }

    }, [password, confirmPassword]);

    useEffect(() => {

        if (classes.length > 0) {
            let role_dict = {};
            classes.forEach(cls => {
                role_dict[cls._id] = cls.name;
            });
            setRoleDict(role_dict);
        }

    }, [classes])

    useEffect(() => {

        dispatch(getClasses());

    }, []);

    return (
        <Box
            className="register-form-parent"
        >
            {classIsLoading && <Spinner />}
            {authIsLoading && <Spinner />}
             <Paper
                elevation={16}
            >
                <form onSubmit={handleFormSubmit}>
                    <Box
                        component={"section"}
                        className="register-form"
                    >
                        <Typography
                            variant="h4"
                            gutterBottom={true}
                            className="register-title"
                        >
                            Registration
                        </Typography>

                        {(errorMode && errorMessage) && <Alert sx={{ width: 'calc(100% - 32px)' }} variant="filled" severity={errorMode}>
                            {errorMessage}
                        </Alert>}

                        {(authIsError && authMessage) && <Alert sx={{ width: 'calc(100% - 32px)' }} variant="filled" severity={'error'}>
                            {authMessage}
                        </Alert>}

                        {/* First Name */}
                        <FormControl 
                            variant="outlined" 
                            sx={{
                                width: "100%"
                            }}
                        >
                            <TextField
                                required
                                id="first_name"
                                label="First Name"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                autoComplete="off"
                            />
                        </FormControl>

                        {/* Last Name */}
                        <FormControl 
                            variant="outlined" 
                            sx={{
                                width: "100%"
                            }}
                        >
                            {/* <InputLabel htmlFor="first_name">Last Name</InputLabel> */}
                            <TextField
                                required
                                id="last_name"
                                label="Last Name"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                autoComplete="off"
                            />
                        </FormControl>
                        
                        {/* Email */}
                        <FormControl 
                            variant="outlined" 
                            sx={{
                                width: "100%"
                            }}
                        >
                            {/* <InputLabel htmlFor="email">Email</InputLabel> */}
                            <TextField
                                required
                                id="email"
                                label="Email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                            />
                        </FormControl>

                        {/* Password */}
                        <FormControl 
                            variant="outlined"
                            sx={{
                                width: "100%"
                            }}
                        >
                            <InputLabel htmlFor="password">Password *</InputLabel>
                            <OutlinedInput
                                required
                                id="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                error={passwordError ? true: false}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
                        </FormControl>

                        {/* Confirm Password */}
                        <FormControl 
                            variant="outlined"
                            sx={{
                                width: "100%"
                            }}
                        >
                            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                            <OutlinedInput
                                required
                                id="confirm_password"
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                error={passwordError ? true: false}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
                        </FormControl>

                        {/* Role */}
                        <FormControl
                            fullWidth
                        >
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '1em'
                                }}
                                value={selectedRole}
                                onChange={(e) => {
                                    setSelectedRole(e.target.value);
                                    setSelectedClass([]);
                                }}
                            >
                                <FormLabel  sx={{ marginTop: "0.5em", color: '#000000de !important' }}>Role:</FormLabel>
                                <FormControlLabel value="lecturer" control={<Radio />} label="Lecturer" />
                                <FormControlLabel value="student" control={<Radio />} label="Student" />
                            </RadioGroup>
                        </FormControl>

                        {/* Classes */}
                        <FormControl fullWidth>
                            <InputLabel id="select-class-label">Classes *</InputLabel>
                            <Select
                                required
                                labelId="select-class-label"
                                id="select-class"
                                multiple={selectedRole === "lecturer" ? true : false}
                                value={selectedClass}
                                label="Classes *"
                                onChange={(e) => {
                                    if (selectedRole === "lecturer") {
                                        setSelectedClass(e.target.value);
                                    } else {
                                        setSelectedClass([e.target.value]);
                                    }
                                }}
                            >
                                {
                                    classes.map( (cls, idx) => <MenuItem key={idx} value={cls._id}>{cls.name}</MenuItem>)
                                }
                            </Select>
                            {(selectedClass.length > 0 && selectedRole === "lecturer") && <Stack direction="row" spacing={1} sx={{
                                flexWrap: 'wrap',
                                marginTop: '0.5em',
                                gap: '0.5em'
                            }}>
                                {selectedClass.map( (sc, idx) => <Chip key={idx} label={roleDict[sc]} variant="outlined filled" />)}
                            </Stack>}
                        </FormControl>

                        <Button 
                            variant="contained"
                            type="submit"
                            sx={{
                                marginTop: '2em'
                            }}
                        >Submit</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
}

export default Register;