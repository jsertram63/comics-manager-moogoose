const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const Category = require('./models/category');
const Book = require('./models/book');
const Month = require('./models/month');
const User = require('./models/user');


const MONGODB_URI =
  'mongodb+srv://lunack63:5tI6kkFSs0cYEZnp@cluster0-ytacm.mongodb.net/comics-manager?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});


//const sequelize = require('./util/database');
// set engine views
app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const bookStoreRoutes = require('./routes/bookStore');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

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
  app.use(bookStoreRoutes);
  app.use(authRoutes);

mongoose
  .connect(
    'mongodb+srv://lunack63:5tI6kkFSs0cYEZnp@cluster0-ytacm.mongodb.net/comics-manager?retryWrites=true&w=majority',  { useUnifiedTopology: true,useNewUrlParser: true }
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