const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var json_body_parser = bodyParser.json();

var port = process.env.PORT || 3000;
var router = express.Router();
var cors = require('cors');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tennisapp'
});

app.use(json_body_parser);
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use('/api', router);


/*
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/*');
    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
  next();
  });
app.use(cors({origin: 'http://localhost:4200'}));
*/

router.route('/players').get((req, res) => {
  const query = 'SELECT * FROM players ORDER BY points DESC LIMIT 100';

  connection.query(query, (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

router.route('/players/:id').get((req, res, next) => {
  const query = 'SELECT * FROM players WHERE player_key = "' + req.params.id + '"';

  connection.query(query, (err, rows, fields) => {
    if (err) {
      throw err;
    }
    res.status(200).send(rows);
  });
});

app.listen(port, () => {
  console.log('Server started at port 3000!');
  connection.connect();
});
