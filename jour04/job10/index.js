const mongoose = require('mongoose');
const readlineSync = require('readline-sync');

mongoose.connect('mongodb://localhost:27017/laPlateforme', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


const yearSchema = new mongoose.Schema({
  year: {
    type: String,
    enum: ['Bachelor 1', 'Bachelor 2', 'Bachelor 3'],
    required: [true, 'Le cursus est requis.']
  }
});

const Year = mongoose.model('Year', yearSchema, 'year');

const studentSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: [true, 'L\'ID de l\'étudiant est requis.'],
    min: [1, 'L\'ID de l\'étudiant doit être un nombre positif.']
  },
  lastname: { 
    type: String, 
    required: [true, 'Le nom de famille est requis.'],
    minlength: [1, 'Le nom de famille ne peut pas être vide.']
  },
  firstname: { 
    type: String, 
    required: [true, 'Le prénom est requis.'],
    minlength: [1, 'Le prénom ne peut pas être vide.']
  },
  students_number: { 
    type: Number, 
    required: [true, 'Le numéro d\'étudiant est requis.'],
    unique: true,
    min: [1, 'Le numéro d\'étudiant doit être un nombre positif.']
  },
  year_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Year',
    required: [true, 'Le cursus est requis.']
  }
});

const Student = mongoose.model('Student', studentSchema, 'student');

// Exemple d'utilisation: suppression d'un étudiant
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
