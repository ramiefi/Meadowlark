var express = require('express');
var app = express();
var path = require('path');

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, '/views'));

// set up handlebars as view engine
var handlebars = require('express-handlebars')
    .create({
        layoutsDir: path.join(__dirname, "views/layouts"),
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// seting the port that the app will listen to
app.set('port', process.env.PORT || 3000);




//route to home page - when no specific html page name is sent

app.get('/', function(req, res) {
    res.render('home');
});

//route to "about" page when called
app.get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

// custom 404 page
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});


// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});