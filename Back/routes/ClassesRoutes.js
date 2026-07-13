import express from 'express';
import Router from  'express';

import ClassesController from '../controllers/ClassesController.js';

const router = Router();

router.get('/', ClassesController.getAllClasses);
router.get('/:id', ClassesController.getClassById);
router.post('/', ClassesController.createClass);
router.put('/:id', ClassesController.updateClass);
router.delete('/:id', ClassesController.deleteClass);

export default router;