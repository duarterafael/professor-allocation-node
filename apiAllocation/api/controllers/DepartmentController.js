const database = require('../models');
const { validationResult } = require('express-validator');

class DepartmentController{

  static async getAllDepartments(req, res) {
    try {
      const AllDpt = await database.Department.findAll();
      return res.status(200).json(AllDpt);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getById(req, res) {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const department = await database.Department.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!department) {
        return res.status(404).json({ message: 'department not found' });
      }

      return res.status(200).json(department);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
    static async createDpt(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newDpt = req.body;
    try {
      const dptCreated = await database.Department.create(newDpt);
      return res.status(200).json(dptCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async updateDpt(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const department = await database.Department.findOne({
        where: {
          id: Number(id),
        },
      });
      if (!department) {
        return res.status(404).json({ message: 'department not found' });
      }
      department.name = name;
      await department.save();
      return res.status(200).json({ message: 'department updated' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async deleteDpt(req, res) {
    const { id } = req.params;
    try {
      const department = await database.Department.findOne({
        where: {
          id: Number(id),
        },
      });
      if (!department) {
        return res.status(404).json({ message: 'department not found' });
      }
      await department.destroy();
      return res.status(200).json({ message: 'department deleted' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = DepartmentController;