const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62272eb6e0e3d88a9af21687'
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})

// 62272eb6e0e3d88a9af21687 userId
