const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`API launched on port ${port}`);
});

app.use(express.json());

let students;

const loadStudents = async () => {
  try {
    const data = await fs.readFile('./students.json', 'utf8');
    students = JSON.parse(data);
  } catch (err) {
    console.error('Error reading students.json:', err);
    students = [];
  }
};

loadStudents();

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(student => student.id === id);
  if (!student) {
    res.status(404).send('Student not found');
  } else {
    res.json(student);
  }
});

app.post('/students', (req, res) => {
  const newStudent = req.body;
  newStudent.id = students.length + 1;
  students.push(newStudent);
  res.json(newStudent);
});

app.delete('/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(student => student.id === id);
  if (index === -1) {
    res.status(404).send('Student not found');
  } else {
    const deletedStudent = students.splice(index, 1)[0];
    res.json(deletedStudent);
  }
});

app.put('/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(student => student.id === id);
  if (index === -1) {
    res.status(404).send('Student not found');
  } else {
    const updatedStudent = { ...students[index], ...req.body };
    students[index] = updatedStudent;
    res.json(updatedStudent);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});