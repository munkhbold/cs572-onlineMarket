const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/onlinemarket', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    app.listen(3000, ()=>{
      console.log("Server is running on 3000 ...");
    });
  })
  .catch(err=>console.log(err));



