const mongoose = require('mongoose');

const uri = "mongodb+srv://luizcgandra29:Gandra2903@aita-cluster.ugwwxfy.mongodb.net/";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    dbName: 'aita-db',
};

const run = async () => {
    try {
        await mongoose.connect(uri, options);
        await mongoose.connection.db.command({ ping: 1 });
        console.log('Successfully connected to MongoDB!');
    } catch (error) {
        console.error(error);
    }
};

run();

module.exports = mongoose;