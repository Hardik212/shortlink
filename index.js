const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(cors());
const urlRoute = require('./routes/url');
require('dotenv').config();

const connectToMongoDB = require('./connection');
const dburi = process.env.MONGO_URI;
connectToMongoDB(dburi).then(()=>console.log("Mongodb Connected."));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/url", urlRoute);
app.listen(port, ()=>console.log(`Server started at port ${port}`));