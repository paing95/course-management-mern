import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import activityReducer from '../features/activity/activitySlice';
import classReducer from '../features/class/classSlice';
import courseReducer from '../features/course/courseSlice';
import coursFileReducer from "../features/course/courseFileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activity: activityReducer,
    class: classReducer,
    course: courseReducer,
    courseFile: coursFileReducer,
  },
});
