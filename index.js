//download env 
require('dotenv').config();

//express and spinning up the server
//download express

const express = require('express');
const app = express();

//adding middleware 
app.use(express.json());

//kept port private in .env
const port = process.env.PORT;

const characters=require('./harrypotter.json')

//main endpoint - GET 
app.get('/', function (req, res) {
  res.send('Welcome to the Harry Potter World')
})

// character endpoint - GET 
app.get('/characters', (req,res)=>{
  res.send(characters);
})

//
//TEST
//using this for debugging 
// app.get("/characters/debug/:name", (req, res)=>{
//   const name = req.params.name;
//   const check = characters.findIndex((character)=>character.name.toLowerCase() == name.toLowerCase());
//   res.send(`Name : ${name}, Index : ${check}`);

// });
//

// create id endpoint - GET 
app.get("/characters/:id", (req, res)=> {
    const id = req.params.id;
    const character  = characters.find((character)=> character.id == id);
      if(character == undefined){
        res.status(404).send("The character does not exist!");
      } else{
        res.send(character);
      }
    });

//create POST after creating IDs

const ids= characters.map((character)=>(character.id));
let maxId = Math.max(...ids);

app.post("/characters", (req, res)=>{
  const character = characters.find((character)=>character.name.toLowerCase() == req.body.name.toLowerCase());
;
if(character != undefined){
  res.status(409).send("That character already exists.");
} else{
  maxId += 1;
  req.body.id = maxId;
  characters.push(req.body);
  res.status(201).send(req.body);
}
});

// DELETE an item using splice() 
//BUG: it needs to update the IDs
app.delete("/characters/:name", (req, res)=>{
  const name = req.params.name.toLowerCase();
  const charIndex = characters.findIndex((character)=>character.name.toLowerCase() == name);

  if(charIndex == -1){
    res.status(404).send("The character does not exist");
  } else{
    characters.splice(charIndex, 1);
    maxId = Math.max(...ids);
    res.sendStatus(204);
    
  }






});


//listen at port 
app.listen(port, ()=> {
    console.log(`The app is listening on port${port}`)
})