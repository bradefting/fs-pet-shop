#! /Users/brade/.nvm/versions/node/v7.0.0/bin/node

'use strict';
// module.exports = {
//     "extends": "eslint:recommended"
// };

//gets file system to use
var fs = require('fs');
//gets path to use
var path = require('path');
//creates path to pwd
var petPath = path.join(__dirname, 'pets.json');


var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

//reads entire path/err first //data=pet info
if(cmd ==='read'){
  var petIndex = process.argv[3];
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);

    if(petIndex >= 0 && petIndex < pets.length){
      console.log(pets[petIndex]);
    }else if(!petIndex){
      console.log(pets);
    }else{
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

  });
}
else if (cmd === 'create') {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    //declare argv's
    var pets = JSON.parse(data);
    var pAge = parseInt(process.argv[3]);
    var pKind = process.argv[4];
    var pName = process.argv[5];

    //if has age, kind, and name, create object to push into array
    if(pAge && pKind && pName){
      var newPet = {};
      newPet.age = pAge;
      newPet.kind = pKind;
      newPet.name = pName;

      pets.push(newPet);

      var petJSON = JSON.stringify(pets);

      fs.writeFile(petPath, petJSON, function(writeErr){
        if(writeErr){
          throw writeErr;
        }

          console.log(newPet);

      });

    }else{
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

  });
}
else if(cmd === 'update'){
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    //declare argv's
    var pets = JSON.parse(data);
    var petIndex = parseInt(process.argv[3]);
    var pAge = parseInt(process.argv[4]);
    var pKind = process.argv[5];
    var pName = process.argv[6];

    // petPath = /Users/brade/galvanize/node/fs-pet-shop/pets.json

    if(petIndex >= 0 && petIndex < pets.length & pAge && pKind && pName){
      pets[petIndex].age = pAge;
      pets[petIndex].kind = pKind;
      pets[petIndex].name = pName;

      var petJSON = JSON.stringify(pets);

      fs.writeFile(petPath, petJSON, function(writeErr){
        if(writeErr){
          throw writeErr;
        }

          console.log(pets[petIndex]);

      });

    }else{
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

  });
}
else if(cmd === 'destroy'){
  var petIndex = process.argv[3];
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);

    if(petIndex >= 0 && petIndex < pets.length){
      console.log(pets[petIndex]);
      pets.splice(petIndex, 1);

      var petJSON = JSON.stringify(pets);

      fs.writeFile(petPath, petJSON, function(writeErr){
        if(writeErr){
          throw writeErr;
        }
      });

    }else{
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
  });
}
else{
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
