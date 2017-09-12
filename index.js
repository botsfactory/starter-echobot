//@ts-check
require('source-map-support').install();

const path = require('path')
const botbuilder = require('botbuilder');
const _ = require("lodash");
const moment = require("moment");
const express = require("express");
const router = express.Router()
const querystring = require('querystring');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const cmusers = require("@botsfactory/modules/src/users");
// const cmconversation = require("@botsfactory/modules/src/conversation");

const connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const server = express();
var bot = new botbuilder.UniversalBot(connector);

bot.dialog('/', function(session){
    session.endDialog("I heard: %s", session.message.text);
})


server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});


server.use(bodyParser.json())
server.use(methodOverride())

server.use(router)


// this is for localtunnel
server.get('/', (req, res) => res.send('hola'))

// Handle Bot Framework messages
server.post('/api/messages', connector.listen());


// cmusers.install(bot, db, server, { FACEBOOK_PAGE_TOKEN: process.env.FACEBOOK_PAGE_TOKEN })

// //cmanalytics.install(bot, process.env.DASHBOT_API_KEY);

// //
// cmconversation.installGeneric(bot, db);

//
//cmerrors.installRollbarReporter(bot, { token: process.env.ROLLBAR_TOKEN, environment: process.env.NODE_ENV });


const listener = server.listen(process.env.PORT, function () {

    console.log('Bot started listening on', listener.address().address, listener.address().port);
})

