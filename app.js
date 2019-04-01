const express = require('express');
const bodypParser = require('body-parser');

const app = express();

app.use(bodypParser.json());

app.get('/', (req,res,next) => {
    res.send('hello');
})

app.listen(3000);