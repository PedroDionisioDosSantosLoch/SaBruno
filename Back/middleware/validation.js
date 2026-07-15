import Joi from 'joi';

export function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: true,
                message: error.details[0].message
            });
        }

        next();
    };
}

export const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'professor', 'aluno').required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const studentSchema = Joi.object({
    name: Joi.string().min(3).required(),
    sala: Joi.number().integer().positive().required(),
    endereco: Joi.string().min(3).required()
});

export const classSchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().allow('', null).optional()
});

export const enrollmentSchema = Joi.object({
    studentId: Joi.number().integer().required(),
    classId: Joi.number().integer().required()
});

export const gradeSchema = Joi.object({
    studentId: Joi.number().integer().required(),
    nota: Joi.number().min(0).max(10).required()
});