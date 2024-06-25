import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// MUI
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Tooltip
} from '@mui/material';

// image
import LogoImage from "../assets/img/logo.png";
import ProfileImage from "../assets/img/profile.png";

// css
import './Header.css';

const Header = ({ children }) => {

    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    // all the pages
    const pages = [
        {
            name: "Course List",
            url: "/"
        },
        {
            name: "Create a Course",
            url: "/create-course"
        }
    ];

    // events
    const handleMenuClicked = (menu) => {
        navigate(menu.url);
    }

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
                        <Tooltip title="My Profile">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="User Profile" src={ProfileImage} />
                            </IconButton>
                        </Tooltip>
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