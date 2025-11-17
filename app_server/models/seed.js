// Db connection and trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// read seed data
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// del existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// close connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});