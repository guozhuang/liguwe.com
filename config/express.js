'use strict';
var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    favicon = require('serve-favicon');


module.exports = function () {

    var app = express();


    //app.use(favicon(__dirname + '/evernote/favicon.ico'));
    app.use(favicon('evernote/favicon.ico'));


    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());


    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);

    //app.use(express.static('./public'));
    app.use(express.static('./evernote'));

    return app;
};


