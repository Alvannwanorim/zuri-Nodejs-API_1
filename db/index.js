const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// console.log(process.env.MONGODB_URI_LOCAL);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI_LOCAL, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
    console.log(`connect to local database ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
