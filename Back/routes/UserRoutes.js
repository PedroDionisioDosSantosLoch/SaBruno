const express = require('express');
const router = express.Router();

const {
    login,
    register,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/UserController');

router.post('/login', login);
router.post('/register', register);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;