# Course Management

A simple website for a university course management. Written in a simple **MERN** stack. 

### <u>User Roles</u>

There are two types of users: **lecturer** and **student**.

As a lecturer, the person can do
1. add courses,
2. add, remove course activities,
3. upload files to course activity, and 
4. chat with students on a chat room of the course.

As a student, the person can do
1. view courses, activities and files, and
2. chat with teachers and other students on a chat room of the course.

Both user types can register and create an account.

### <u>Things that may be interesting</u>

1. Using GridFS, upload files in chunks and show the uploaded files as file url in browser. Codes related to those can be viewed at **courseFileController.js**.

2. Authentication using JWT. Codes related to this is at **authMiddleware.js**.

3. Socket.io for chat feature.

Live version is available at: [Website Hosted at Render](https://course-management-web.onrender.com).

Sample Lecturer Account: testlecturer1@gmail.com (abc123!@#)
Sample Student Account: testuser6@gmail.com (abc123!@#)

