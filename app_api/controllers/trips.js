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

// Post: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    console.log('trips add method called');

    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if(!q)
    { // DB returned no data
        return res
            .status(400)
            .json(err);
    } else { // return new trip
        return res
            .status(201)
            .json(q);
    }

    // uncommment the following line to show results of operation
    // on the console
    // console.log(q);
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    console.log('tripsUPdateTrip method is called');

    const q = await Model.findOneAndUpdate(
        { 'code' : req.params.tripCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
        { new: true }
    )
    .exec();

    if(!q) {
        //db returned no data
        return res.status(400).json(err);
    } else {
        // data returned
        return res.status(201).json(q);
    }

    // Uncommet the following line to show res
    // console.log(q)
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};