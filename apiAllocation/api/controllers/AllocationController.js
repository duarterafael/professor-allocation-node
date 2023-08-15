const database = require('../models');
const { validationResult } = require('express-validator');

class AllocationController {
    static async getAllAllocations(req, res) {
        try {
            const allAllocations = await database.Allocation.findAll();
            return res.status(200).json(allAllocations);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getAllocationsByProfessor(req, res) {
        const { professorId } = req.params;
        try {
            const allocations = await database.Allocation.findAll({
            where: {
                professor_id: Number(professorId),
            },
            });
            return res.status(200).json(allocations);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getAllocationById(req, res) {
        const { id } = req.params;
        try {
            const allocation = await database.Allocation.findByPk(id);
            if (!allocation) {
            return res.status(404).json({ message: 'Allocation not found' });
            }
            return res.status(200).json(allocation);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getAllocationsByCourse(req, res) {
        const { courseId } = req.params;
        try {
            const allocations = await database.Allocation.findAll({
            where: {
                course_id: Number(courseId),
            },
            });
            return res.status(200).json(allocations);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
  static async createAllocation(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { professor_id, course_id, week_day, start_hour, end_hour } = req.body;

    try {
      const allocation = await database.Allocation.create({
        professor_id,
        course_id,
        week_day,
        start_hour,
        end_hour,
      });

      return res.status(201).json(allocation);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async updateAllocation(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { professor_id, course_id, week_day, start_hour, end_hour } = req.body;

    try {
      const existingAllocation = await database.Allocation.findByPk(id);

      if (!existingAllocation) {
        return res.status(404).json({ message: 'Allocation not found' });
      }

      // Verificar se o professor já tem alocação no mesmo horário
      const conflictingAllocation = await database.Allocation.findOne({
        where: {
          professor_id: Number(professor_id),
          week_day,
          start_hour: {
            [database.Sequelize.Op.lte]: end_hour,
          },
          end_hour: {
            [database.Sequelize.Op.gte]: start_hour,
          },
          id: {
            [database.Sequelize.Op.ne]: id, // Excluir a própria alocação atual da verificação de conflito
          },
        },
      });

      if (conflictingAllocation) {
        return res.status(400).json({ message: 'Professor already has an allocation at the same time' });
      }

      existingAllocation.professor_id = professor_id;
      existingAllocation.course_id = course_id;
      existingAllocation.week_day = week_day;
      existingAllocation.start_hour = start_hour;
      existingAllocation.end_hour = end_hour;

      await existingAllocation.save();

      return res.status(200).json(existingAllocation);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async deleteAllocation(req, res) {
    const { id } = req.params;

    try {
      const allocation = await database.Allocation.findByPk(id);

      if (!allocation) {
        return res.status(404).json({ message: 'Allocation not found' });
      }

      await allocation.destroy();

      return res.status(200).json({ message: 'Allocation deleted successfully' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

module.exports = AllocationController;
