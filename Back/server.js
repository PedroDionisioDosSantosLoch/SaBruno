import express from "express";
import database from "./config/database.js";
import sequelize from "./config/database.js";
import StudentsRoutes from './routes/StudentsRoutes.js';
import ClassesRoutes from './routes/ClassesRoutes.js';
import EnrollmentsRoutes from './routes/EnrollmentsRoutes.js';
import GradesRoutes from './routes/GradesRoutes.js';
import UserRoutes from './routes/UserRoutes.js'

const app = express();

app.use(express.json());

app.use('/students', StudentsRoutes);
app.use('/classes', ClassesRoutes);
app.use('/enrollments', EnrollmentsRoutes);
app.use('/grades', GradesRoutes);
app.use('/users',UserRoutes)

sequelize.sync()
    .then(() => {
        app.listen(5173, () => {
            console.log('Servidor rodando na porta http://localhost:5173/');
        });
    })
    .catch((err) => {
        console.log(err);
    });