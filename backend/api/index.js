if (process.env.NODE_ENV !== 'production') require("dotenv").config();

const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const port_no = process.env.PORT_NO;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));

app.listen(port_no, (req, res) => {
    console.log(`Server running on port ${port_no}`);
});

app.get("/", (req, res) => {
    res.send("Hi");
})