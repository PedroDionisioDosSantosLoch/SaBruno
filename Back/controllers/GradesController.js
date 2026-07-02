const Grades = require('../models/Grades');

const getAll = async (req, res) => {
    const data = await Grades.findAll();
    res.json(data);
};

const getById = async (req, res) => {
    const data = await Grades.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.json(data);
};

const create = async (req, res) => {
    const novoRegistro = await Grades.create(req.body);
    res.status(201).json(novoRegistro);
};

const update = async (req, res) => {
    const data = await Grades.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Registro não encontrado' });
    }

    await data.update(req.body);
    res.json(data);
};

const remove = async (req, res) => {
    const data = await Grades.findByPk(req.params.id);

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