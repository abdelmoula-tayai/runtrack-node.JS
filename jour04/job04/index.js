const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/laPlateforme'; 

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
    });


const yearSchema = new mongoose.Schema({
  year: {
    type: String,
    enum: ['Bachelor 1', 'Bachelor 2', 'Bachelor 3']
  }
});

const Year = mongoose.model('Year', yearSchema, 'year');


const bachelor1 = new Year({ year: 'Bachelor 1' });
const bachelor2 = new Year({ year: 'Bachelor 2' });
const bachelor3 = new Year({ year: 'Bachelor 3' });


Promise.all([bachelor1.save(), bachelor2.save(), bachelor3.save()])
  .then(savedYears => {
    console.log('Années insérées :', savedYears);

    const studentSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        students_number: String,
        year_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Year'}
    });

    const Student = mongoose.model('Student', studentSchema, 'student');

    const studentsData = [
        { firstname: 'Bob', lastname: 'LeBricoleur', students_number: 'STU12345', year_id: savedYears[0]._id },
        { firstname: 'John', lastname: 'Doe', students_number: 'STU67890', year_id: savedYears[1]._id },
        { firstname: 'Marine', lastname: 'Dupont', students_number: 'STU24680', year_id: savedYears[2]._id }
    ]

    async function insertStudents() {
        try {
            
            await Student.insertMany(studentsData);
            console.log('Données des étudiants insérées avec succès.');
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données des étudiants:', error);
        }
    }

    insertStudents();
  })
  .catch(err => console.error(err));