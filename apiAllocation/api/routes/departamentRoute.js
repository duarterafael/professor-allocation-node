const express = require('express');
require('express-group-routes');

const DepartamentController = require('../controllers/DepartamentController');

const app = express();

app.group("/department", (router) => { 
    router.get('/list', DepartamentController.getAllDepartaments);
    router.get('/:id', DepartamentController.getById);
    router.post('/new', DepartamentController.createDpt);
});

module.exports = app;
