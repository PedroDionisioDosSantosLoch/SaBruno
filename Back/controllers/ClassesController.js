import Classes from '../models/Classes.js';

const ClassesController = {
    getAllClasses: async (req, res) => {
        const data = await Classes.findAll();
        res.json(data);
    },
    getClassById: async (req, res) => {
    const data = await Classes.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Classe não encontrada' });
    }

    res.json(data);
},

    createClass: async (req, res) => {
        const novoRegistro = await Classes.create(req.body);
        res.status(201).json({ novoRegistro, message: 'Classe criada com sucesso' });
    },

    updateClass: async (req, res) => {
    const data = await Classes.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Classe não encontrada' });
    }

    await data.update(req.body);
    res.json({ data, message: 'Classe atualizada com sucesso' });
},

    deleteClass: async (req, res) => {
    const data = await Classes.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Classe não encontrada' });
    }

    await data.destroy();
    res.json({ message: 'Classe removida com sucesso' });
},
}

export default ClassesController;