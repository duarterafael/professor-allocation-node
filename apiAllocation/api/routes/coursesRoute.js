const express = require('express');
require('express-group-routes');
const { body, param, validationResult } = require('express-validator');

const validateIdParam = require('../middlewares/idValidator');
const { validateCreateCourse , validateUpdate} = require('../middlewares/course');


const CourseController = require('../controllers/CourseController');

const router = express.Router();

router.group("/course", (router) => {
  router.get('/list', CourseController.getAllCourses);
  router.get('/:id', validateIdParam('id'), CourseController.getCourseById);
  router.post('/new',validateCreateCourse , CourseController.createCourse);
  router.put('/update/:id', validateIdParam('id'), validateUpdate, CourseController.updateCourse);
  router.delete('/:id', validateIdParam('id'), CourseController.deleteCourse);

});

module.exports = router;
