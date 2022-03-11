const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6229d9b7565a0c46c52a40d3',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Ресурс не найден!' });
})

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
