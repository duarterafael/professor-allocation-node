const express = require('express');
const { body } = require('express-validator');

const AllocationController = require('../controllers/AllocationController');
const validateIdParam = require('../middlewares/idValidator');
const {
    allocationValidateData,
    validateCreateAllocation,
  } = require('../middlewares/allocation');
  


const app = express();

app.group("/allocation", (router) => {
    router.get('/list', AllocationController.getAllAllocations);
    router.get('/professor/:professorId', AllocationController.getAllocationsByProfessor);
    router.get('/:id', validateIdParam('id'), AllocationController.getAllocationById);
    router.get('/course/:courseId', AllocationController.getAllocationsByCourse);
    router.post('/new', validateCreateAllocation, allocationValidateData, AllocationController.createAllocation);
    router.put('/update/:id',validateIdParam('id'), AllocationController.updateAllocation);
    router.delete('/:id', validateIdParam('id'), AllocationController.deleteAllocation);
});

module.exports = app;
