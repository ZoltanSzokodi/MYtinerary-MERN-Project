const City = require('../models/cityModel');
const appError = require('../../utils/appError');

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find({})
      .select('name country description img'); // only the fields I need
    const response = {
      length: cities.length,
      cities: cities
    };
    res.send(response);
  }
  catch (error) {
    res.status(500).json(error);
  }
};

exports.postCity = async (req, res) => {
  try {
    !req.user.isAdmin && appError('You are not authorized to add cities', 403);

    const cityName = await City.findOne({ name: req.body.name });

    cityName && appError('This city already exists', 409);

    let city = await City.create(req.body);
    const response = {
      message: 'City successfuly added!',
      newCity: city
    };
    res.status(201).json(response);
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

exports.deleteCity = async (req, res) => {
  try {
    !req.user.isAdmin && appError('You are not authorized to delete cities', 403);

    const deleteCity = await City.findByIdAndDelete(req.body.id);

    !deleteCity && appError('Invalid id number', 400);

    res.status(200).json({ message: 'City successfuly removed' });
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};

exports.updateCity = async (req, res) => {
  try {
    !req.user.isAdmin && appError('You are not authorized to update cities', 403);

    const updateCity = await City.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      omitUndefined: true,
      runValidators: true,
    });

    !updateCity && appError('Invalid id number', 400);

    const response = {
      message: 'City successfuly updated!',
      updatedCity: updateCity
    };
    res.status(200).json(response);
  }
  catch (error) {
    res.status(error.status || 500).json(error);
  }
};