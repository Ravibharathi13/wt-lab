const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/personal_info', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose model
const personSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
});
const Person = mongoose.model('Person', personSchema);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/persons', async (req, res) => {
  const persons = await Person.find();
  res.json(persons);
});

app.post('/api/persons', async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.json(person);
});

app.put('/api/persons/:id', async (req, res) => {
  await Person.findByIdAndUpdate(req.params.id, req.body);
  res.json({ status: 'Updated' });
});

app.delete('/api/persons/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ status: 'Deleted' });
});

// Launch app
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/wtex6-2.html');
});
