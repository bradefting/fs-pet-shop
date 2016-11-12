"use strict";

var express = require('express');
var app = express();

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//gets file system to use
var fs = require('fs');
//gets path to use
var path = require('path');
//creates path to pwd
var petPath = path.join(__dirname, 'pets.json');

// app.use(express.static('public'));

app.get('/pets', function(req, res){
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);

    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res){
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);

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

app.post('/pets', function(req, res){
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);

    var newPet = req.body;

    //if empty
    if(!newPet.name && !newPet.age && !newPet.kind) {
      return res.sendStatus(404);
    }

    //if missing some input
    else if(!newPet.name || !newPet.age || !newPet.kind) {
      return res.sendStatus(400);
    }

    var addPet = {};

    addPet.age = Number.parseInt(newPet.age);
    addPet.kind = newPet.kind;
    addPet.name = newPet.name;

    pets.push(addPet);

    var petJSON = JSON.stringify(pets);

    fs.writeFile(petPath, petJSON, function(writeErr){
      if(writeErr){
        throw writeErr;
      }

      res.send(pets[pets.length-1]);

    });
  });
});

app.put('/pets/:index', function(req, res){
  var index = req.params.index;

  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);

    var updatePet = req.body;

    //if empty
    if(!updatePet.name && !updatePet.age && !updatePet.kind) {
      return res.sendStatus(404);
    }

    //if missing some input
    else if(!updatePet.name || !updatePet.age || !updatePet.kind) {
      return res.sendStatus(400);
    }

    pets[index].name = updatePet.name;
    pets[index].age = updatePet.age;
    pets[index].kind = updatePet.kind;

    var petJSON = JSON.stringify(pets);

    fs.writeFile(petPath, petJSON, function(writeErr){
      if(writeErr){
        throw writeErr;
      }

      res.send(pets[index]);

    });
  });
});

app.listen('8080', function(){
  console.log('Server 8080 started');
});

module.exports = app;
