const express = require('express')
const con = require('./database.js')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  /*
  res.json({
      "data":{
"name": "pikachu",
"number": 25,
"img": "https://images.pokemontcg.io/base1/58.png"
}
  })*/

  res.send (
  

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM cards", function (err, result, fields) {
        if (err) throw err;
        console.log(result[2].img);
      });
    })

    
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  