"use strict";

var express = require('express');
var app = express();

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var pets = require('./pets.json');

// app.use(express.static('public'));

app.get('/pets', function(req, res){
  res.send(pets);
});

app.get('/pets/:id', function(req, res){
  var petIndex = req.params.id;
  var numPets = pets.length;

  if(petIndex >=0 && petIndex<numPets){
    res.send(pets[petIndex]);
  }
  else{
    return res.sendStatus(404);
  }
});

app.post('/pets', function(req, res){
  var newPet = req.body;

  if (!newPet.age || !newPet.kind || !newPet.name) {
    return res.sendStatus(400);
  }else if(!newPet.age && !newPet.kind && !newPet.name) {
    return res.sendStatus(404);
  }

  var addPet = {};

  addPet.age = Number.parseInt(newPet.age);
  addPet.kind = newPet.kind;
  addPet.name = newPet.name;

  pets.push(addPet);

  res.send(pets);

});

app.listen('8080', function(){
  console.log('Server 8080 started');
});

module.exports = app;
