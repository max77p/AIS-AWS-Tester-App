const express = require("express");
const app = express();
var path = require("path");
var bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// require('./routes')(app);
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/src/index.html'));
//   })


app.listen(port, () => console.log("Listening on port 8080!"));