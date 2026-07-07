const express = require('express');
const sequelize = require('./config/database');

const StudentsRoutes = require('./routes/StudentsRoutes');
const ClassesRoutes = require('./routes/ClassesRoutes');
const EnrollmentsRoutes = require('./routes/EnrollmentsRoutes');
const GradesRoutes = require('./routes/GradesRoutes');

const app = express();

app.use(express.json());

app.use('/students', StudentsRoutes);
app.use('/classes', ClassesRoutes);
app.use('/enrollments', EnrollmentsRoutes);
app.use('/grades', GradesRoutes);

sequelize.sync()
    .then(() => {
        app.listen(5173, () => {
            console.log('Servidor rodando na porta http://localhost:5173/');
        });
    })
    .catch((err) => {
        console.log(err);
    });