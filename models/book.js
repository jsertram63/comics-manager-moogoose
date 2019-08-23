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