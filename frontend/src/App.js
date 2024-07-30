import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { reset } from "./features/auth/authSlice";

// libraries
import { jwtDecode } from "jwt-decode";

// pages
import CourseDetails from './pages/course/CourseDetails';
import CourseList from './pages/course/CourseList';
import CreateCourse from './pages/course/CreateCourse';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';

// css
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    let decoded = null;
    if (user) {
      decoded = jwtDecode(user.token);
    }
    let expired = false;

    if (user && Date.now() >= decoded.exp * 1000) {
      expired = true;
    }

    if (!user && (location.pathname !== '/login' && location.pathname !== '/register')) {
      navigate('/login');
    } else if (user && expired) {
      localStorage.removeItem('course-mgmt-user');
      dispatch(reset());
      navigate('/login');
    }
  });

  return (
    <>
      <div className='container'>
          <Header>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<CourseList />} />
              {user && user.role === 'lecturer' && <Route path='/create-course' element={<CreateCourse />} />}
              <Route path='/course' element={<CourseDetails />} />
            </Routes>  
          </Header>
      </div>
    </>
  );
}

export default App;
