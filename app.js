const express = require('express');
const path = require('path');
const app = express();


app.use('/assets', express.static('assets'));

app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/assets/about-agency.html');
});

app.get('/contact', function (req, res) {
  res.sendFile(__dirname + '/assets/contacts-v1.html');
});

app.get('/services', function (req, res) {
  res.sendFile(__dirname + '/assets/services-v3.html');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/index.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname + '/assets/404-v2.html'));
});


app.listen(process.env.PORT);