const mongoose = require('mongoose');
const readlineSync = require('readline-sync');

const URL = 'mongodb://localhost:27017/laPlateforme';

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const yearSchema = new mongoose.Schema({
  year: {
    type: String,
    enum: ['Bachelor 1', 'Bachelor 2', 'Bachelor 3'],
    required: true
  }
});

const Year = mongoose.model('Year', yearSchema, 'year');

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  students_number: { type: Number, required: true, unique: true },
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});

const Student = mongoose.model('Student', studentSchema, 'student');

const userInput = readlineSync.questionInt('Entrez un numéro d\'étudiant pour filtrer les étudiants ayant un numéro plus grand : ');

Student.find({ students_number: { $gt: userInput } })
  .populate('year_id')
  .then(students => {
    if (students.length === 0) {
      console.log('Aucun étudiant trouvé avec un numéro d\'étudiant supérieur à', userInput);
    } else {
      console.log('Etudiants avec un numéro d\'étudiant supérieur à', userInput, ':');
      students.forEach(student => {
        console.log(`${student.firstname} ${student.lastname} (${student.students_number}) - ${student.year_id ? student.year_id.year : 'N/A'}`);
      });
    }
  })
  .catch(err => console.error('Erreur lors de la récupération des étudiants:', err))
  .finally(() => mongoose.connection.close());
