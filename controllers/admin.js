const Category = require('../models/category');
const Book = require('../models/book');
const Month = require('../models/month');

exports.getAddCategory = (req, res, next) => {
    res.render('admin/edit-category', {
      pageTitle: 'Add category',
      path: '/admin/add-category',
      editing: false,
    });
  };

exports.postAddCategory = (req, res, next) => {
    const nameCat = req.body.name;
    console.log("POST ADD CATEGORY");
    const category = new Category({
        name: nameCat
    });
    category
    .save()
    .then(result =>{
        console.log('created category');
    })
    .catch(err => {
        console.log(err);
    })

}


exports.getAddComics = (req, res, next) => {

    Category.find()
    .then(categories => {
        //console.log(categories)
        Month.findAll().then(months => {
            res.render('admin/edit-comics', {
                pageTitle: 'Add comics',
                path: '/admin/add-comics',
                editing: false,
                categories:categories,
              //  months:months
            });
        }).catch(err=> {
            console.log(err);
        });

        

      
    })
    .catch(err=> {
        console.log(err);
    })

    
    
};
    
exports.postAddComics = (req, res, next) => {
   const catId = req.body.category;
    const title = req.body.name;
    var categoryComics;
    const userId = '5d5eb7e9815df3819bbc60c6';
    
    console.log("add comics");
    console.log(req.body.category);
    console.log(req.user);
    Category.findById(catId).then(cat => {
        categoryComics = cat._id;
        const book = new Book({
            name: title,
            category:{
                name:cat.name,
                categoryId:req.body.category
            },
           userId:req.user
           
        })
       book.save().then(result=> {
        res.redirect('/');
       }).catch(err => {
           console.log(err);
       });
    })
    .catch(err => {

    });

 
}
