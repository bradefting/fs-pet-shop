"use strict";

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//read pet.json this way to only "get"/fs.read/write when making changes(pt4)
// var pets = require('./pets.json');

app.get('/pets', function(req, res){
  fs.readFile('petsPath', 'utf8', function(err, data){
    if (err){
      console.error(err.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(data);

    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res){
  fs.readFile('petsPath', 'utf8', function(err, data){
    if (err){
      console.error(err.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(data);

    //get url parameter called id
    var petIndex = req.params.id;
    var numPets = pets.length;

    if(petIndex >=0 && petIndex<numPets){
      res.send(pets[petIndex]);
    }
    else{
      return res.sendStatus(404);
    }
  });
});

app.listen('8080', function(){
  console.log('Server 8080 started');
});

module.exports = app;
