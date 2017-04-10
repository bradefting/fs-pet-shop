#! /Users/brade/.nvm/versions/node/v7.0.0/bin/node
// run test npm test test/pets.bonus.test.js

// HOW TO USE FOR FUTURE BRAD
// commands

// $ node pet.js (in terminal)
// Usage: node pets.js [read | create | update | destroy]

//to read all pets
// $ node pets.js read (in terminal)
// [ { age: 7, kind: 'rainbow', name: 'fido' },
//   { age: 5, kind: 'snake', name: 'Buttons' },
//   { age: 3, kind: 'dog', name: 'Charlie' } ]

// to read one pet #1
// $ node pets.js read 1
// { age: 5, kind: 'snake', name: 'Buttons' }

// to create new pet
// node pets.js create 3 parakeet Cornflake  (in terminal)
// { age: 3, kind: 'parakeet', name: 'Cornflake' }

// to update
// $ node pets.js update 1 9 cat Rosey (in terminal)
// { age: 9, kind: 'cat', name: 'Rosey' }

// to destroy
// $ node pets.js destroy 1 (in terminal)
// { age: 5, kind: 'snake', name: 'Buttons' }

'use strict';
// module.exports = {
//     "extends": "eslint:recommended"
// };

let fs = require('fs');
let path = require('path');
let petPath = path.join(__dirname, 'pets.json');

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if(cmd === 'read'){
  
}else if(cmd === 'create'){

}else if(cmd === 'update'){

}else if(cmd === 'destroy'){

}else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
