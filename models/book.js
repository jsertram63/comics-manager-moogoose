const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const comicsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category:{
    name: {
      type:String,
      required: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  }


  
})


module.exports = mongoose.model('Comics',comicsSchema);