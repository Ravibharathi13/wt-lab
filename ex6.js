const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const users = [
  { username: 'admin', password: '123456' },
  { username: 'user1', password: 'pass12' } 
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'wtex6.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.send(`<h2 style="text-align:center;">Login successful! Welcome, ${username}.</h2>`);
  } else {
    res.send(`<h2 style="text-align:center; color: red;">Invalid credentials. Please try again.</h2>`);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
