const mongoose = require("mongoose")

async function connectDB() {
    try {
        const conn = await  mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
         console.log('Successfully connected to MongoDB.')
    } catch (error) {
          console.error(`Error: ${error.message}`);
           process.exit(1);
    }
}


module.exports = connectDB