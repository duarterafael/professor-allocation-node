const database = require('../models');
const { body, validationResult } = require('express-validator');

const validateCreateDepartment = [
  body('name')
    .notEmpty().withMessage('name is required')
    .isLength({ min: 4 }).withMessage('name must have at least 4 characters'),
];


const validateUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (id) {
    try {
      const department = await database.Department.findOne({
        where: {
          id: Number(id),
        },
      });
      
      if (!department) {
        return res.status(404).json({ message: 'department not found' });
      }

      req.department = department;
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  // Verifica se a requisição está atualizando um departamento
  if (req.method === 'PUT' && id && !req.department) {
    return res.status(400).json({ message: 'department not found for updating' });
  }

  // Validação dos dados recebidos no corpo da solicitação
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Verifica se o novo nome do departamento no corpo da solicitação não é vazio e tem pelo menos 4 caracteres
  if (req.method === 'PUT' && name && name.length < 4) {
    return res.status(400).json({ message: 'name must have at least 4 characters' });
  }
  next();
};
module.exports = {
    validateCreateDepartment,
    validateUpdate
  };