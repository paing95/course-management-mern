# Course Management

A simple website for a university course management. Written in a simple **MERN** stack. 

### <u>User Roles</u>

There are two types of users: **lecturer** and **student**.

As a lecturer, the person can do
1. add courses
2. add, remove course activities, and
3. upload files to course activity.

As a student, the person can do
1. view courses, activities and files.

Both user types can register and create an account.

### <u>Things that may be interesting</u>

1. Using GridFS, upload files in chunks and show the uploaded files as file url in browser. Codes related to those can be viewed at **courseFileController.js**.

2. Authentication using JWT. Codes related to this is at **authMiddleware.js**.

Live version is available at: [Vercel Hosted Website](https://course-management-sage.vercel.app/login).