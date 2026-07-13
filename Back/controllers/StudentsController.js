import Students from '../models/Students.js'

const StudentsController = {
    getAllStudents: async (req, res) => {
        const data = await Students.findAll();
        res.json(data);
    },

    getStudentById: async (req, res) => {
        const data = await Students.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Estudante não encontrado' });
    }

        res.json(data);
    },

    createStudent: async (req, res) => {
        const novoRegistro = await Students.create(req.body);
        res.status(201).json({ novoRegistro, message: 'Estudante criado com sucesso' });
    },

    updateStudent: async (req, res) => {
        const data = await Students.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Estudante não encontrado' });
    }

    await data.update(req.body);
    res.json({ data, message: 'Estudante atualizado com sucesso' });
},

    deleteStudent: async (req, res) => {
    const data = await Students.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Estudante não encontrado' });
    }

    await data.destroy();
    res.json({ message: 'Estudante removido com sucesso' });
},
}

export default StudentsController;