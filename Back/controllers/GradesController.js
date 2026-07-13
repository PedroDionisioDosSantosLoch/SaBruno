import Grades from '../models/Grades.js'
const GradesController = {
    getAllGrades: async (req, res) => {
        const data = await Grades.findAll();
        res.json(data);
    },
    getGradeById: async (req, res) => {
    const data = await Grades.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Nota não encontrada' });
    }

    res.json(data);
},

    createGrade: async (req, res) => {
        const novoRegistro = await Grades.create(req.body);
        res.status(201).json({ novoRegistro, message: 'Nota criada com sucesso' });
    },

    updateGrade: async (req, res) => {
    const data = await Grades.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Nota não encontrada' });
    }

    await data.update(req.body);
    res.json({ data, message: 'Nota atualizada com sucesso' });
},

    deleteGrade: async (req, res) => {
    const data = await Grades.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Nota não encontrada' });
    }

    await data.destroy();
    res.json({ message: 'Nota removida com sucesso' });
}
}

export default GradesController;