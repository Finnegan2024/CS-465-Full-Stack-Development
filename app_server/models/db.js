const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// Build the connection string and set the connection timeout
// timeout in ms
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {}), 1000);
}

// monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', () => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows listener
if(process.platform == 'win32'){
    const r1 = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// Configure graceful shutdown
const gracefulShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
    });
};

// Event Listeners for graceful shutdown

// nodemon shutdown
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// App termination shutdown
process.on('SIGINT', () => {
    gracefulShutdown('app termination');
    process.exit(0);
});

// Container termination shutdown
process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown');
    process.exit(0);
});

// make initial db connection
connect();

// Import schema
require('./travlr');
module.exports = mongoose;