const Classes = require('../models/Classes');

const getAll = async (req, res) => {
    const data = await Classes.findAll();
    res.json(data);
};

const getById = async (req, res) => {
    const data = await Classes.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Classe não encontrada' });
    }

    res.json(data);
};

const create = async (req, res) => {
    const novoRegistro = await Classes.create(req.body);
    res.status(201).json({ novoRegistro, message: 'Classe criada com sucesso' });
};

const update = async (req, res) => {
    const data = await Classes.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Classe não encontrada' });
    }

    await data.update(req.body);
    res.json({ data, message: 'Classe atualizada com sucesso' });
};

const remove = async (req, res) => {
    const data = await Classes.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Classe não encontrada' });
    }

    await data.destroy();
    res.json({ message: 'Classe removida com sucesso' });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};