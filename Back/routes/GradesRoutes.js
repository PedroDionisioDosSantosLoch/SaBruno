import express from 'express';
import Router from 'express'

import GradesController from '../controllers/GradesController.js';

const router = Router();

router.get('/', GradesController.getAllGrades);
router.get('/:id', GradesController.getGradeById);
router.post('/', GradesController.createGrade);
router.put('/:id', GradesController.updateGrade);
router.delete('/:id', GradesController.deleteGrade);

export default router;
