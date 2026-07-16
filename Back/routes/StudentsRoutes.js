import express from 'express';
import Router from  'express';
import { validate, studentSchema } from '../middleware/validation.js';
import StudentsController from '../controllers/StudentsController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = Router();


router.post('/', authMiddleware, validate(studentSchema), StudentsController.create);
router.get('/', StudentsController.getAllStudents);
router.get('/:id', StudentsController.getStudentById);
router.post('/', StudentsController.createStudent);
router.put('/:id', StudentsController.updateStudent);
router.delete('/:id', StudentsController.deleteStudent);

export default router;