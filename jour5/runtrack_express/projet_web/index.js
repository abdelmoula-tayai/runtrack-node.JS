const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const fs = require('fs').promises;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Add this line to parse JSON request bodies

app.listen(port, () => {
  console.log(`Server launched on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/students', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../api/students.json'), 'utf8');
    const students = JSON.parse(data);
    res.render('students', { students });
  } catch (err) {
    console.error('Error reading students.json:', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/students', async (req, res) => {
  const newStudent = req.body;
  try {
    const data = await fs.readFile(path.join(__dirname, '../api/students.json'), 'utf8');
    const students = JSON.parse(data);
    students.push(newStudent);
    await fs.writeFile(path.join(__dirname, '../api/students.json'), JSON.stringify(students));
    res.status(201).json(newStudent);
  } catch (err) {
    console.error('Error writing to students.json:', err);
    res.status(500).send('Internal server error');
  }
});

app.put('/students/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const data = await fs.readFile(path.join(__dirname, '../api/students.json'), 'utf8');
    const students = JSON.parse(data);
    const index = students.findIndex(student => student.id === id);
    if (index === -1) {
      res.status(404).send('Student not found');
    } else {
      const updatedStudent = { ...students[index], ...req.body };
      students[index] = updatedStudent;
      await fs.writeFile(path.join(__dirname, '../api/students.json'), JSON.stringify(students));
      res.json(updatedStudent);
    }
  } catch (err) {
    console.error('Error updating students.json:', err);
    res.status(500).send('Internal server error');
  }
});

app.delete('/students/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const data = await fs.readFile(path.join(__dirname, '../api/students.json'), 'utf8');
    const students = JSON.parse(data);
    const index = students.findIndex(student => student.id === id);
    if (index === -1) {
      res.status(404).send('Student not found');
    } else {
      students.splice(index, 1);
      await fs.writeFile(path.join(__dirname, '../api/students.json'), JSON.stringify(students));
      res.status(204).send();
    }
  } catch (err) {
    console.error('Error deleting from students.json:', err);
    res.status(500).send('Internal server error');
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});