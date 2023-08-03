const { Router } = require('express');
const DepartamentController = require('../controllers/DepartamentController');

const router = Router();

router.get('/listDpt', DepartamentController.getAllDepartaments);
router.get('/listDpt/:id', DepartamentController.getById);
router.post('/create', DepartamentController.createDpt);

module.exports = router;