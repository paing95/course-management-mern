import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../features/auth/authSlice';

// MUI
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Popover,
    Toolbar
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// image
import LogoImage from "../assets/img/logo.png";
import ProfileImage from "../assets/img/profile.png";

// css
import './Header.css';

const Header = ({ children }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    // all the pages
    const pages = [
        {
            name: "Course List",
            url: "/"
        }
    ];

    if (user && user.role === 'lecturer') {
        pages.push(
            {
                name: "Create a Course",
                url: "/create-course"
            }
        );
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);

    // events
    const handleMenuClicked = (menu) => {
        navigate(menu.url);
    };

    const handleProfileClicked = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenProfileDialog(true);
    };

    const handleLogoutClicked = () => {
        setAnchorEl(null);
        setOpenProfileDialog(false);

        localStorage.removeItem('course-mgmt-user');
        dispatch(reset());
        window.location.href = '/login';
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenProfileDialog(false);
    };

    return (
        <>
        <AppBar position="static" className={`site-app-bar ${!user ? "hidden" : ""}`}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box className='logo-box'>
                        <img src={LogoImage} className='logo-size' />
                    </Box>
                    <Box className="course-menu-parent">
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                className='course-menu'
                                onClick={(e) => handleMenuClicked(page)}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ p: 0 }} id={"userprofile-btn"} onClick={handleProfileClicked}>
                            <Avatar alt="User Profile" src={ProfileImage} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openProfileDialog}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleLogoutClicked}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <Container maxWidth="xl" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            {children}
        </Container>        
        </>
    )
};

export default Header;