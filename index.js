const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/index");
const detailRoute = require("./routes/detailRoutes");

const dotenv = require("dotenv");
const app = express();
dotenv.config();

//Middlewares
app.use(express.json({ extended: false }));
app.use(morgan("dev"));

//Routes
app.use("/api/v1/details", detailRoute);

const PORT = process.env.PORT || 5000;
// initialize Database connection
connectDB();

//listen to server
app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
