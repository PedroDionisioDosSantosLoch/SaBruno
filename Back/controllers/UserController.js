import User from '../models/User.js';

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
        const novoRegistro = await User.create(req.body);
        res.status(201).json({ novoRegistro, message: 'Usuário criado com sucesso' });
    },

    updateUser: async (req, res) => {
        const data = await User.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

        await data.update(req.body);
        res.json({ data, message: 'Usuário atualizado com sucesso' });
    },

    deleteUser: async (req, res) => {
        const data = await User.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

        await data.destroy();
        res.json({ message: 'Usuário removido com sucesso' });
    }
};

export default UserController;