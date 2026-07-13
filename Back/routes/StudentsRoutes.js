import express from 'express';
import Router from  'express';

import StudentsController from '../controllers/StudentsController.js';

const router = Router();

router.get('/', StudentsController.getAllStudents);
router.get('/:id', StudentsController.getStudentById);
router.post('/', StudentsController.createStudent);
router.put('/:id', StudentsController.updateStudent);
router.delete('/:id', StudentsController.deleteStudent);

export default router;