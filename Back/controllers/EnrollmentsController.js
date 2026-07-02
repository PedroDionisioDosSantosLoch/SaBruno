const Enrollments = require('../models/Enrollments');

const getAll = async (req, res) => {
    const data = await Enrollments.findAll();
    res.json(data);
};

const getById = async (req, res) => {
    const data = await Enrollments.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.json(data);
};

const create = async (req, res) => {
    const novoRegistro = await Enrollments.create(req.body);
    res.status(201).json({ novoRegistro, message: 'Registro criado com sucesso' });
};

const update = async (req, res) => {
    const data = await Enrollments.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Registro não encontrado' });
    }

    await data.update(req.body);
    res.json({ data, message: 'Registro atualizado com sucesso' });
};

const remove = async (req, res) => {
    const data = await Enrollments.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Registro não encontrado' });
    }

    await data.destroy();
    res.json({ message: 'Registro removido com sucesso' });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};