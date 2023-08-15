const database = require('../models');

class ProfessorController {
  static async getAllProfessors(req, res) {
    try {
      const professors = await database.Professor.findAll();
      return res.status(200).json(professors);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getProfessorById(req, res) {
    const { id } = req.params;
    try {
      const professor = await database.Professor.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!professor) {
        return res.status(404).json({ message: 'Professor not found' });
      }

      return res.status(200).json(professor);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createProfessor(req, res) {
    const { name, cpf, department_id } = req.body;
  
    try {
      const newProfessor = await database.Professor.create({
        name,
        cpf,
        department_id, 
      });
  
      return res.status(201).json(newProfessor);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateProfessor(req, res) {
    const { id } = req.params;
    const { name, cpf } = req.body;

    try {
      const professor = await database.Professor.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!professor) {
        return res.status(404).json({ message: 'Professor not found' });
      }

      await professor.update({
        name,
        cpf,
      });

      return res.status(200).json({ message: 'Professor updated successfully' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteProfessor(req, res) {
    const { id } = req.params;

    try {
      const professor = await database.Professor.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!professor) {
        return res.status(404).json({ message: 'Professor not found' });
      }

      await professor.destroy();
      return res.status(200).json({ message: 'Professor deleted successfully' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ProfessorController;
