//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

// UserSchema creation

const userSchema = {
    email: String,
    password: String
}
//Model Creation -> remember that will pass the "User" to mongo and will turn into "users" collection
const User = new mongoose.model("User", userSchema)




// A fazeres
app.route("/")

    .get(function (req, res) {
        res.render("home")
    })


app.get("/login", function (req, res) {
    res.render("login")
})


app.get("/register", function (req, res) {
    res.render("register")
})

app.post("/register", function (req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })
    newUser.save(function (err) {
        if (err) {
            console.log(err)
        } else {
            res.render("secrets")
        }
    })
})

app.post("/login", function (req, res) {
    const username = req.body.username
    const password = req.body.password

    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets")
                }
            }
        }
    })
})



// Configurações da porta e localhost

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server started sucessfully");
});
