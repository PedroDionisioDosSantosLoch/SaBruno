import express from "express";
import database from "./config/database.js";
import sequelize from "./config/database.js";
import StudentsRoutes from './routes/StudentsRoutes.js';
import ClassesRoutes from './routes/ClassesRoutes.js';
import EnrollmentsRoutes from './routes/EnrollmentsRoutes.js';
import GradesRoutes from './routes/GradesRoutes.js';
import UserRoutes from './routes/UserRoutes.js'
import authMiddleware from "./middleware/authMiddleware.js";
import roleMiddleware from "./middleware/roleMiddleware.js";
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
app.use('/users',UserRoutes);

app.use('/students', authMiddleware,StudentsRoutes);
app.use('/classes', authMiddleware,ClassesRoutes);
app.use('/enrollments', authMiddleware,roleMiddleware('admin','professor'),EnrollmentsRoutes);
app.use('/grades', authMiddleware,roleMiddleware('admin','professor'),GradesRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3001, () => {
            console.log('Servidor rodando na porta http://localhost:5173/');
        });
    })
    .catch((err) => {
        console.log(err);
    });