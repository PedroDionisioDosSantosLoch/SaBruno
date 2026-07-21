import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../middleware/authMiddleware.js';

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const data = await User.findAll();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const data = await User.findByPk(req.params.id);

            if (!data) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.json(data);
        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    },

    register: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

      
            const usuarioExistente = await User.findOne({ where: { email } });
            if (usuarioExistente) {
                return res.status(409).json({
                    error: true,
                    message: 'Já existe um usuário cadastrado com esse e-mail'
                });
            }

          
            const hashedPassword = await bcrypt.hash(password, 10);

            const novoRegistro = await User.create({
                name,
                email,
                password: hashedPassword,
                role
            });

            res.status(201).json({ novoRegistro, message: 'Usuário criado com sucesso' });
        } catch (err) {
            console.error('Erro ao registrar usuário:', err);
            res.status(500).json({ error: true, message: err.message });
        }
    },

    login: async (req, res) => {
        try {
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
        } catch (err) {
            console.error('Erro ao logar:', err);
            res.status(500).json({ error: true, message: err.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const data = await User.findByPk(req.params.id);

            if (!data) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await data.update(req.body);
            res.json({ data, message: 'Usuário atualizado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const data = await User.findByPk(req.params.id);

            if (!data) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await data.destroy();
            res.json({ message: 'Usuário removido com sucesso' });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    }
};

export default UserController;