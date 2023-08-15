const { body, param, validationResult } = require('express-validator');
const database = require('../models');

const validateCreateCourse = [
  body('name')
    .notEmpty().withMessage('name is required')
    .isLength({ min: 4 }).withMessage('name must have at least 4 characters'),
];
const validateUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (id) {
    try {
      const course = await database.Course.findOne({
        where: {
          id: Number(id),
        },
      });
      
      if (!course) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }

      req.course = course; // Adiciona o Curso à requisição
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  // Verifica se a requisição está atualizando um Curso
  if (req.method === 'PUT' && id && !req.course) {
    return res.status(400).json({ message: 'Curso não encontrado para atualização' });
  }

  // Validação dos dados recebidos no corpo da solicitação
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Verifica se o novo nome do curso no corpo da solicitação não é vazio e tem pelo menos 4 caracteres
  if (req.method === 'PUT' && name && name.length < 4) {
    return res.status(400).json({ message: 'O novo nome do curso deve ter pelo menos 4 caracteres' });
  }
  next();
};
module.exports = {
    validateCreateCourse,
    validateUpdate
  };