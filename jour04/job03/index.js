const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/laPlateforme'; 

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    students_number: String,
    year_id: Number
});

const Student = mongoose.model('Student', studentSchema, 'student');

const studentsData = [
    { firstname: 'Bob', lastname: 'LeBricoleur', students_number: 'STU12345', year_id: 2024 },
    { firstname: 'John', lastname: 'Doe', students_number: 'STU67890', year_id: 2024 },
    { firstname: 'Marine', lastname: 'Dupont', students_number: 'STU24680', year_id: 2024 }
]

async function insertStudents() {
    try {
        // Insérer les données des étudiants dans la base de données
        await Student.insertMany(studentsData);
        console.log('Données des étudiants insérées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données des étudiants:', error);
    }
}

insertStudents();





