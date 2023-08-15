const express = require('express');
require('express-group-routes');
const { body, param } = require('express-validator');
const validateIdParam = require('../middlewares/idValidator');

const ProfessorController = require('../controllers/ProfessorController');
const professorValidateMiddleware = require('../middlewares/professor'); 

const app = express();

app.group("/professor", (router) => {
  router.get('/list', ProfessorController.getAllProfessors);
  router.get('/:id',validateIdParam('id'), ProfessorController.getProfessorById);
  router.post('/new', professorValidateMiddleware, ProfessorController.createProfessor); 
  router.put('/update/:id',validateIdParam('id'), professorValidateMiddleware, ProfessorController.updateProfessor); 
  router.delete('/:id',validateIdParam('id'), ProfessorController.deleteProfessor);
});

module.exports = app;
