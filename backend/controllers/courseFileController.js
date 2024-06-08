const asyncHandler = require('express-async-handler');
const { Readable } = require('stream');
const mongoose = require('mongoose');

// models
const ActivityModel = require('../models/activityModel');
const CourseModel = require('../models/courseModel');
const CourseFileModel = require('../models/courseFileModel');

// @desc    Upload Course File
// @route   /api/courses/files/
// @access  Private
const uploadCourseFile = asyncHandler(async(req, resp) => {
    // check if request has course id
    if (!req.body.course_id || !req.body.activity_id) {
        resp.status(400);
        throw new Error('Please provide course id and activity id.');
    }

    const { course_id, activity_id } = req.body;

    // check if course exists
    const findCourse = await CourseModel.findById(course_id);
    if (!findCourse) {
        resp.status(400);
        throw new Error('The course does not exist.');
    }

    // check if activity exists
    const findActivity = await ActivityModel.findById(activity_id);
    if (!findActivity) {
        resp.status(400);
        throw new Error('The activity does not exist.');
    }

    const { originalname, buffer } = req.file;
    
    // GridFS Bucket, Upload Stream,
    let bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db,
        { bucketName: 'courses' }
    );
    let uploadStream = bucket.openUploadStream(originalname);

    // Readable Stream
    let readBuffer = new Readable();
    readBuffer.push(buffer);
    readBuffer.push(null);

    // Upload the file
    const isUploaded = await new Promise((resolve, reject)=>{
        readBuffer.pipe(uploadStream)
        .on("finish", resolve("successfull"))
        .on("error" , reject("error occured while creating stream") )
    });

    // if upload fails, return an error message
    if(!isUploaded){
        resp.status(404);
        throw new Error("File upload fails.");
    }

    // append new file id and update course object
    let allCourseFiles = findCourse.files || [];
    let newFile = {
        file: uploadStream.id,
        activity: activity_id
    };
    allCourseFiles.push(newFile);
    await CourseModel.updateOne(
        { _id: req.body.course_id }, 
        { files: allCourseFiles }
    );

    const course = await CourseModel.findById(course_id).populate([
        'lecturer', 'activities',
        'files.file', 'files.activity',
    ]);

    return resp.send({ results: course });
});

// @desc    View Course File
// @route   /api/courses/files/:id
// @access  Private
const viewCourseFile = asyncHandler(async(req, resp) => {
    const findCourseFile = await CourseFileModel.findById(req.params.id);

    if (!findCourseFile) {
        resp.status(400);
        throw new Error('The course file does not exist.');
    }

    // GridFS Bucket, Write Stream,
    let bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db,
        { bucketName: 'courses' }
    );
    bucket.openDownloadStream(findCourseFile._id).pipe(resp);
});

module.exports = {
    uploadCourseFile,
    viewCourseFile
}