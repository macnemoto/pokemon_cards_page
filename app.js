const express = require('express')
const bodyParser = require('body-parser')
const con = require('./database.js')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())




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


  con.query("DELETE * from cards WHERE id = ?", [req.params.id] ,(error, rows) => {
    if (!error) {
    res.send(`Cards with the record Id: ${[req.params.id]} has been removed.`);
    }

    console.log(error);
  });
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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