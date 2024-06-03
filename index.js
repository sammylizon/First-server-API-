require('dotenv').config();

//express and spinning up the server

const express = require('express');
const app = express();

//kept port private in .env
const port = process.env.PORT;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, ()=> {
    console.log(`The app is listening on post${port}`)
})