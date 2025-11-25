const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// List all trips
// response must have status code
// and JSON message
const tripsList = async (req, res) => {
    const q = await Model
    .find({}) // returns all records
    .exec();

    // uncomment below to show results
    // console.log(q);

    if(!q){
        // db returned no data
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

// get a single trip
// include status code
// and json message
const tripsFindByCode = async(req, res) => {
    const q = await Model
    .find({'code' : req.params.tripCode })
    .exec();

    // uncomment for results in console
    console.log(q);

    if(!q){
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};