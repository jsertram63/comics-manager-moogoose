const Book = require('../models/book');
const Category = require('../models/category');
const Month = require('../models/month');

exports.getIndex = (req, res, next) => {
  comicsArray = [];
   Book.find()
   .then(books => {

       console.log(books);
       res.render('bookstore/index', {
        pageTitle: 'All Comics',
        comics:books,
        isAuthenticated: req.session.isLoggedIn,
        path: '/'
      });  
  });

}


exports.getComics = (req, res, next) => {
 
  const comicsId = req.params.comicsId;
  console.log(comicsId);
  Book.findById(comicsId)
    .then(comics=> {
      console.log(comics);
      res.render('bookstore/book-details', {
        book:comics,
        pageTitle: "details",
        isAuthenticated: req.session.isLoggedIn,
        path: '/comics'
      });
    })
    .catch(err => console.log(err));
};