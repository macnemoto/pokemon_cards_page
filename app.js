const express = require('express')
const bodyParser = require('body-parser')
const con = require('./database.js')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  


app.post("/cards", function (req, res) {
  let newCards = { ...req.body };

  con.query("INSERT INTO cards SET ?", newCards, (error, result) => {
    if (error) {
      return res.status(500).json({ status: "ERROR", error });
    }

    return res.json({ status: "SUCCESS" });
  });
});

// Get all cards in database
app.get('/', (req, res) => {


  con.query("SELECT * from cards", (error, result) => {
    if (error) {
      return res.json({ status: "ERROR", error });
    }

    return res.json(result);
  });
    
})


// Get a cars by id
app.get('/:id', (req, res) => {


  con.query("SELECT * from cards WHERE id = ?", [req.params.id] ,(error, result) => {
    if (error) {
      return res.json({ status: "ERROR", error });
    }

    return res.json(result);
  });
    
})

// Get a cars by name
app.get('/pokemon/:name', (req, res) => {


  con.query("SELECT * from cards WHERE name = ?", [req.params.name] ,(error, result) => {
    if (error) {
      return res.json({ status: "ERROR", error });
    }

    return res.json(result);
  });
    
})

// Delete by id 
app.delete('/:id', (req, res) => {


  con.query("DELETE from cards WHERE id = ?", [req.params.id] ,(error, rows) => {
  

    if (!error) {

    console.log(`borrada la carta numero ${[req.params.id]}`)
    res.status(204).send(`Cards with the record Id: ${[req.params.id]} has been removed.`);

    }else
     {

      console.log(error);
    }

    
  });
    
})

// add new record in the database
app.post('', (req, res) => {
  // Query to insert multiple rows
  let query = `INSERT INTO cards 
  (name, img) VALUES ?;`;

  const params = req.body;


  con.query("INSERT INTO cards (name, img) VALUES ?;", [params] ,(error, rows)   => {
  

    if (!error) {

    console.log(`borrada la carta numero ${params}`)
    res.send(`Cards with the record Id: ${params.name} has been removed.`);

    }else{
      console.log(error);
    }

    
  });
    
})




//result[2].img `<br>` + result[2].name

  /*
  res.json({
      "data":{
"name": "pikachu",
"number": 25,
"img": "https://images.pokemontcg.io/base1/58.png"
}
  })*/