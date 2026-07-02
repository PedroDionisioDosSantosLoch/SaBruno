const Students = require('../models/Students');

const getAll = async (req, res) => {
    const data = await Students.findAll();
    res.json(data);
};

const getById = async (req, res) => {
    const data = await Students.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Estudante não encontrado' });
    }

    res.json(data);
};

const create = async (req, res) => {
    const novoRegistro = await Students.create(req.body);
    res.status(201).json({ novoRegistro, message: 'Estudante criado com sucesso' });
};

const update = async (req, res) => {
    const data = await Students.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Estudante não encontrado' });
    }

    await data.update(req.body);
    res.json({ data, message: 'Estudante atualizado com sucesso' });
};

const remove = async (req, res) => {
    const data = await Students.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Estudante não encontrado' });
    }

    await data.destroy();
    res.json({ message: 'Estudante removido com sucesso' });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};