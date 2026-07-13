import Enrollments from '../models/Enrollments.js';

const EnrollmentsController = {
    getAllEnrollments: async (req, res) => {
        const data = await Enrollments.findAll();
        res.json(data);
    },
    getEnrollmentById: async (req, res) => {
        const data = await Enrollments.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Matrícula não encontrada' });
    }

    res.json(data);
},
    createEnrollment: async (req, res) => {
    const novoRegistro = await Enrollments.create(req.body);
    res.status(201).json({ novoRegistro, message: 'Matrícula criada com sucesso' });
},

updateEnrollment: async (req, res) => {
    const data = await Enrollments.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Matrícula não encontrada' });
    }

    await data.update(req.body);
    res.json({ data, message: 'Matrícula atualizada com sucesso' });
},

    deleteEnrollment: async (req, res) => {
    const data = await Enrollments.findByPk(req.params.id);

    if (!data) {
        return res.status(404).json({ message: 'Matrícula não encontrada' });
    }

    await data.destroy();
    res.json({ message: 'Matrícula removida com sucesso' });
},
}
export default EnrollmentsController