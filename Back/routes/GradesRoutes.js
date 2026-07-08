const express = require('express');
const router = express.Router();

const {
    getAllGrades,
    getGradeById,
    createGrade,
    updateGrade,
    deleteGrade
} = require('../controllers/GradesController');

router.get('/', getAllGrades);
router.get('/:id', getGradeById);
router.post('/', createGrade);
router.put('/:id', updateGrade);
router.delete('/:id', deleteGrade);

module.exports = router;