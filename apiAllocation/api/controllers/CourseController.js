const database = require('../models');
const { validationResult } = require('express-validator');

class CourseController {
  static async getAllCourses(req, res) {
    try {
      const allCourses = await database.Course.findAll();
      return res.status(200).json(allCourses);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getCourseById(req, res) {
    const { id } = req.params;
    try {
      const course = await database.Course.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!course) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }

      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createCourse(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    try {
      const courseCreated = await database.Course.create({ name });
      return res.status(200).json(courseCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateCourse(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const course = await database.Course.findOne({
        where: {
          id: Number(id),
        },
      });
      if (!course) {
        return res.status(404).json({ message: 'course not found' });
      }
      course.name = name;
      await course.save();
      return res.status(200).json({ message: 'course updated' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteCourse(req, res) {
    const { id } = req.params;
    try {
      const course = await database.Course.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!course) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }

      await course.destroy();
      return res.status(200).json({ message: 'Curso excluído com sucesso' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = CourseController;
