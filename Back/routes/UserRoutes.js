import express from 'express';
import Router from  'express';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import UserController from '../controllers/UserController.js';

const router = Router();

router.post('/register', UserController.register);
router.get('/', authMiddleware, roleMiddleware('admin'), UserController.getAllUsers);
router.get('/:id', authMiddleware,UserController.getUserById);
router.put('/:id', authMiddleware,UserController.updateUser);
router.delete('/:id', authMiddleware,roleMiddleware('admin'),UserController.deleteUser);

export default router;
