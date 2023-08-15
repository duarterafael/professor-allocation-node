const { validationResult } = require('express-validator');
const database = require('../models');

const professorValidateMiddleware = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { cpf, department_id } = req.body;

  // Verifica se cpf tem 11 caracteres e tem apenas num
  if (!/^\d{11}$/.test(cpf)) {
    return res.status(400).json({ message: 'Invalid CPF format' });
  }

  try {
    // Verifica se existe um cpf igual cadastrado
    const existingProfessor = await database.Professor.findOne({
      where: {
        cpf,
      },
    });

    if (existingProfessor) {
      return res.status(400).json({ message: 'A professor with this CPF already exists' });
    }

    // Verifica se department_id é um numero e se existe na tabela departamento
    if (!Number.isInteger(Number(department_id))) {
      return res.status(400).json({ message: 'department_id must be a valid integer' });
    }

    const existingDepartment = await database.Department.findOne({
      where: {
        id: Number(department_id),
      },
    });

    if (!existingDepartment) {
      return res.status(400).json({ message: 'Invalid department_id' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }

  next();
};


module.exports = professorValidateMiddleware;
