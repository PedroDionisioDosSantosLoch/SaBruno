import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../middleware/authMiddleware.js';

const UserController = {
  getAllUsers: async (req, res) => {
    const data = await User.findAll();
    res.json(data);
  },

  getUserById: async (req, res) => {
    const data = await User.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(data);
  },

  register: async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const novoRegistro = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ novoRegistro, message: 'Usuário criado com sucesso' });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: true, message: 'Email ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(password, user.password);

    if (!senhaValida) {
      return res.status(401).json({ error: true, message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role, message: 'Login realizado com sucesso' });
  },

  updateUser: async (req, res) => {
    const data = await User.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await data.update(req.body);

    res.json({
      message: 'Usuário atualizado com sucesso',
      data,
    });
  },

  deleteUser: async (req, res) => {
    const data = await User.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await data.destroy();

    res.json({
      message: 'Usuário removido com sucesso',
    });
  },
};

export default UserController;