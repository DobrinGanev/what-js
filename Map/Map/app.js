var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/js', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static(path.join(__dirname, 'public/Bootstrap-Fonts/fonts')));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
 app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get("/", function (req, res) {
    console.log(res);
    res.render("map.html", {
        title: "Map"
    });
});

var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    user: {
        userName: String
    }
});

//db
var uristring = 'mongodb://localhost/userDb';
mongoose.connect(uristring, function (err) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

app.get('/userDb/:id', function (req, res) {
    var user = req.params.id;
    var User = mongoose.model('User', userSchema);
    User.findOne({ 'user.userName': user }, function (err, resad) {
        res.type('application/json');
        res.send(JSON.stringify(resad));
    });
});
var server = app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
module.exports = app;
