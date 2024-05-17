const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/laPlateforme', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {

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

  // Exporter les données de la collection Student
  Student.find().populate('year_id')
    .then(students => {
      const data = students.map(student => ({
        id: student.id,
        lastname: student.lastname,
        firstname: student.firstname,
        students_number: student.students_number,
        year: student.year_id ? student.year_id.year : null
      }));

      fs.writeFile('students.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error('Erreur lors de l\'écriture du fichier JSON:', err);
        } else {
          console.log('Données exportées avec succès dans students.json');
        }
        mongoose.connection.close();
      });
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des étudiants:', err);
      mongoose.connection.close();
    });
})

