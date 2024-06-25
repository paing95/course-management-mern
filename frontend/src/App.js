import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// redux
import { useSelector } from "react-redux";

// pages
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
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <div className='container'>
          <Header>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<CourseList />} />
              <Route path='/create-course' element={<CreateCourse />} />
            </Routes>  
          </Header>
      </div>
    </>
  );
}

export default App;
