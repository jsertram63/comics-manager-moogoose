const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const Category = require('./models/category');
const Book = require('./models/book');
const Month = require('./models/month');
const User = require('./models/user');

const app = express();
//const sequelize = require('./util/database');
// set engine views
app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const bookStoreRoutes = require('./routes/bookStore');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log('middleware');
    User.findById('5d5eeb2423edc48a82c7f2c1')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

  app.use('/admin', adminRoutes);
  app.use(bookStoreRoutes)

mongoose
  .connect(
    'mongodb+srv://login:pwd@cluster0-ytacm.mongodb.net/comics-manager?retryWrites=true&w=majority',  { useUnifiedTopology: true,useNewUrlParser: true }
  )

  .then(result => {

    
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Julien',
          email: 'julien@test.com',
        });
        user.save();
      }
    });
    app.listen(2000);
  })
  .catch(err => {
    console.log(err);
  });