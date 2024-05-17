const mongoose = require('mongoose');
const readlineSync = require('readline-sync');

mongoose.connect('mongodb://localhost:27017/laPlateforme', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error('Connexion à MongoDB échouée !', err));

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

const studentId = readlineSync.questionInt('Entrez l\'ID de l\'étudiant à supprimer : ');

Student.findByIdAndDelete(studentId)
  .then(deletedStudent => {
    if (!deletedStudent) {
      console.log(`Étudiant avec l'ID "${studentId}" non trouvé.`);
    } else {
      console.log(`Étudiant supprimé : ${deletedStudent.firstname} ${deletedStudent.lastname} (${deletedStudent.students_number})`);
    }
  })
  .catch(err => console.error('Erreur lors de la suppression de l\'étudiant:', err))
  .finally(() => mongoose.connection.close());
