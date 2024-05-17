const mongoose = require('mongoose');

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

const bachelor1 = new Year({ year: 'Bachelor 1' });
const bachelor2 = new Year({ year: 'Bachelor 2' });
const bachelor3 = new Year({ year: 'Bachelor 3' });

Year.insertMany([bachelor1, bachelor2, bachelor3])
  .then(years => {
    console.log('Années insérées :', years);

    const bob = new Student({ id: 1, lastname: 'LeBricoleur', firstname: 'Bob', students_number: 145, year_id: years[0]._id });
    const john = new Student({ id: 2, lastname: 'Doe', firstname: 'John', students_number: 237, year_id: years[1]._id });
    const marine = new Student({ id: 3, lastname: 'Dupont', firstname: 'Marine', students_number: 317, year_id: years[2]._id });

    return Promise.all([bob.save(), john.save(), marine.save()]);
  })
  .then(savedStudents => {
    console.log('Étudiants insérés :', savedStudents);

    return Student.find().populate('year_id');
  })
  .then(students => {
    console.log('Etudiants avec leur année :');
    students.forEach(student => {
      console.log(`${student.firstname} ${student.lastname} (${student.students_number}) - ${student.year_id ? student.year_id.year : 'N/A'}`);
    });
  })
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());
