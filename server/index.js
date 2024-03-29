require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./models');
const handle = require('./handlers');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// routes
app.get('/', function (req, res) {
  res.json({name: "John", 
  age: 31, city: "New York"})
});
app.use('/api/auth',routes.auth);
app.use('/api/home',routes.home);

// error handler
app.use(handle.notFound);
app.use(handle.errors);
 
app.listen(port, console.log(`Server started on port ${port}`));