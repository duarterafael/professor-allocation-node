const express = require('express');
require('express-group-routes');

const DepartmentController = require('../controllers/DepartmentController');
const { validateCreateDepartment , validateUpdate} = require('../middlewares/department');
const validateIdParam = require('../middlewares/idValidator');

const app = express();

app.group("/department", (router) => {
  router.get('/list', DepartmentController.getAllDepartments);
  router.get('/:id', validateIdParam('id'), DepartmentController.getById);
  router.post('/new', validateCreateDepartment, DepartmentController.createDpt);
  router.delete('/:id', validateIdParam('id'), DepartmentController.deleteDpt);
  router.put('/update/:id', validateIdParam('id'), validateUpdate, DepartmentController.updateDpt);
});

module.exports = app;
