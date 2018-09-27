var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

const PORT = process.env.PORT || 3000;
var app = express();

// Requiring our models for syncing
var db = require("./models");

/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

/*========= This is the typical node server setup so we can be able to parse the requests/responses coming in and out of the server ============*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/*========= Here we will set up an express jsonwebtoken middleware(simply required for express to properly utilize the token for requests) You MUST instantiate this with the same secret that will be sent to the client ============*/
const jwtMW = exjwt({
  secret: "keyboard cat 4 ever"
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    db.user
      .create({
        username: username,
        password: hash
      })
      .then(result => {
        console.log("User created: ", result);
        res.json("user created!");
      });
  });
});

app.post("/createParty", (req, res) => {
  db.party
    .create({
      username: "WildBoyJean",
      title: "Rick's grad bash",
      price: 10,
      age_mininum: 21,
      alcohol: "Jack Daniels, Apple Ciroc, Bacardi 151",
      description: "A graduation party",
      additional_info: "Wear nice clothes",
      status: "Public",
      photoURLs: "/images/something.jpg, /images/something2.jpg"
    })
    .then(result => {
      console.log("Party created: ", result);
      res.json("party created!");
    });
});

app.get("/findparties", (req, res) => {
  db.party.findAll({}).then(result => {
    console.log(result[0].alcohol);
    let alcohol = result[0].alcohol.split(",");
    console.log(alcohol);
    result[0].alcohol = alcohol;

    let images = result[0].photoURLs.split(",");
    result[0].photoURLs = images;

    res.json(result);
  });
});

/* This is SUPER important! This is the route that the client will be passing the entered credentials for verification to. If the credentials match, then the server sends back a json response with a valid json web token for the client to use for identification. */
app.post("/log-in", (req, res) => {
  const { username, password } = req.body;
  console.log("User submitted: ", username, password);

  db.user
    .findOne({
      where: { username: username }
    })
    .then(user => {
      console.log("User Found: ", user);
      if (user === null) {
        res.json(false);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          console.log("Valid!");
          let token = jwt.sign(
            { username: user.username },
            "keyboard cat 4 ever",
            { expiresIn: 129600 }
          ); // Signing the token
          res.json({
            sucess: true,
            err: null,
            token
          });
        } else {
          console.log("Entered Password and Hash do not match!");
          res.status(401).json({
            sucess: false,
            token: null,
            err: "Entered Password and Hash do not match!"
          });
        }
      });
    });
});

app.get("/", jwtMW /* Using the express jwt MW here */, (req, res) => {
  console.log("Web Token Checked.");
  res.send("You are authenticated"); //Sending some response when authenticated
});

db.sequelize.sync().then(() => {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

module.exports = app;
