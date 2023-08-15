const { body,validationResult } = require('express-validator');
const database = require('../models');

const allocationValidateData  = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { professor_id, course_id, week_day, start_hour, end_hour } = req.body;

  try {
    // Verificar se o professor_id existe na tabela de professores
    const existingProfessor = await database.Professor.findOne({
      where: {
        id: Number(professor_id),
      },
    });

    if (!existingProfessor) {
      return res.status(400).json({ message: 'Invalid professor_id' });
    }

    // Verificar se o course_id existe na tabela de cursos
    const existingCourse = await database.Course.findOne({
      where: {
        id: Number(course_id),
      },
    });

    if (!existingCourse) {
      return res.status(400).json({ message: 'Invalid course_id' });
    }

    // Verificar se o professor já tem alocação no mesmo horário
    const existingAllocation = await database.Allocation.findOne({
      where: {
        professor_id: Number(professor_id),
        week_day,
        start_hour: {
          [database.Sequelize.Op.lte]: end_hour, 
        },
        end_hour: {
          [database.Sequelize.Op.gte]: start_hour, 
        },
      },
    });

    if (existingAllocation) {
      return res.status(400).json({ message: 'Professor already has an allocation at the same time' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }

  next();
};
const validateCreateAllocation= [
    body('professor_id').notEmpty().withMessage('professor_id is required'),
    body('course_id').notEmpty().withMessage('course_id is required'),
    body('week_day').notEmpty().withMessage('week_day is required'),
    body('start_hour').notEmpty().withMessage('start_hour is required'),
    body('end_hour').notEmpty().withMessage('end_hour is required'),
  ];
module.exports = {
    allocationValidateData,
    validateCreateAllocation
};
