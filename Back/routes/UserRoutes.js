import express from 'express';
import Router from  'express';

import UserController from '../controllers/UserController.js';

const router = Router();

router.post('/register', UserController.register);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
