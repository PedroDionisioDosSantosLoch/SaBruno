const User = require('../models/User');

const getAll = async (req, res) => {
    const data = await User.findAll();
    res.json(data);
};

const getById = async (req, res) => {
    const data = await User.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(data);
};

const create = async (req, res) => {
    const novoRegistro = await User.create(req.body);
    res.status(201).json({ novoRegistro, message: 'Usuário criado com sucesso' });
};

const update = async (req, res) => {
    const data = await User.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await data.update(req.body);
    res.json({ data, message: 'Usuário atualizado com sucesso' });
};

const remove = async (req, res) => {
    const data = await User.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await data.destroy();
    res.json({ message: 'Usuário removido com sucesso' });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};