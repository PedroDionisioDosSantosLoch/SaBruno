import express from 'express';
import Router from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import UserController from '../controllers/UserController.js';
import { validate, registerSchema, loginSchema } from '../middleware/validation.js';
const router = Router();
<<<<<<< HEAD
 
=======


<<<<<<< Updated upstream
=======
>>>>>>> f8cda5e035c3a0d5f5725b0cc8737d8616819ee7
>>>>>>> Stashed changes
router.post('/register', validate(registerSchema), UserController.register);
router.post('/login', validate(loginSchema), UserController.login);
router.get('/', authMiddleware, roleMiddleware('admin'), UserController.getAllUsers);
router.get('/:id', authMiddleware, UserController.getUserById);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), UserController.deleteUser);
 
export default router;