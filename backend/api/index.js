if (process.env.NODE_ENV !== 'production') require("dotenv").config();

const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const courtRouter = require("./routes/CourtRoutes");

const app = express();
const port_no = process.env.PORT_NO;
const MONGODB_URI = process.env.MONGO_URI_LOCAL;

app.use(cors({
    origin: 'https://bballconnect.vercel.app',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));

app.use("/courts", courtRouter);

const startServer = async () => {
    try {
        await mongoose.connect(MONGODB_URI);

        app.listen(port_no, (req, res) => {
            console.log(`Server running on port ${port_no}`);
        });

        app.get("/", (req, res) => {
            res.send("Hi");
        });

        app.get("*", (req, res) => {
            res.status(404).send("No route found!");
        });
        
    } catch (err) {
        console.error("Failed to connect to Mongo", err.message);
    }
}

startServer();