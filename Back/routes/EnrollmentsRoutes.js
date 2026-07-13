import express from 'express';
import Router from  'express'

import EnrollmentsController from '../controllers/EnrollmentsController.js';

const router = Router();

router.get('/', EnrollmentsController.getAllEnrollments);
router.get('/:id', EnrollmentsController.getEnrollmentById);
router.post('/', EnrollmentsController.createEnrollment);
router.put('/:id', EnrollmentsController.updateEnrollment);
router.delete('/:id', EnrollmentsController.deleteEnrollment);

export default router;