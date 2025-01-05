const mongoose = require('mongoose');
const mongoUri = "mongodb://127.0.0.1:27017/inotebook?directConnection=true";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
}

module.exports = connectToMongo;  // Export the function itself, not the result of calling it
