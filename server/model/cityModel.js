const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const descriptionValidator = [
  validate({
    validator: 'isLength',
    arguments: [50, 250],
    message: 'Description should be between 50 and 250 characters'
  })
];

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    validate: descriptionValidator
  },
  img: {
    type: String,
  }
});

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('city', citySchema);