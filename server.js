
const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  console.log('Rendering index.ejs');
  res.render('index');
});

app.get('/contacto', (req, res) => {
  res.render('contacto');
});

app.get('/programa', (req, res) => {
  res.render('programa');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/courses', (req, res) => {
    res.render('courses');
});

app.get('/grades', (req, res) => {
    res.render('grades');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
