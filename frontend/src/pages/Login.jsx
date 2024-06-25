import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from '../features/auth/authSlice';

// MUI
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

// css
import './Login.css';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        isError, 
        message 
    } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [errorMode, setErrorMode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submit.');

        dispatch(login({
            email, password
        })).then((e) => {
            if (!e.error?.message) {
                setErrorMessage('Login successful.');
                setErrorMode('success');
                navigate('/');
            }
        });
    }

    return(
        <Box
            className="login-form-parent"
        >   
            <Paper
                elevation={16}
            >
            <form onSubmit={handleFormSubmit}>
                <Box
                    className="login-form"
                >
                    <Typography
                        variant="h4"
                        gutterBottom={true}
                        className="login-title"
                    >
                        Course Management
                    </Typography>

                    {(errorMode && errorMessage) && <Alert sx={{ width: 'calc(100% - 32px)' }} variant="filled" severity={errorMode}>
                        {errorMessage}
                    </Alert>}

                    {(isError && message) && <Alert sx={{ width: 'calc(100% - 32px)' }} variant="filled" severity={'error'}>
                        {message}
                    </Alert>}
                    
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
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                        />
                    </FormControl>
                    <FormControl 
                        variant="outlined"
                        sx={{
                            width: "100%"
                        }}
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            required
                            id="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
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
                    </FormControl>
                    
                    <Typography
                        variant="subtitle1"
                        gutterBottom={true}
                        sx={{
                            marginTop: "0.5em",
                            marginBottom: "0.5em"
                        }}
                    >
                        Please <Link href="/register">register</Link> if you don't have an account.
                    </Typography>

                    <Button 
                        variant="contained"
                        type="Submit"
                    >Login</Button>
                </Box>
            </form>
            </Paper>
        </Box>
    )
}
export default Login;