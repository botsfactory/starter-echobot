//@ts-check
const path = require('path');
const mongoose = require('mongoose');
const botbuilder = require('botbuilder');
const _ = require("lodash");
const moment = require("moment");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const botsfactory = require('@botsfactory/botsfactory');

const connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const server = express();
var bot = new botbuilder.UniversalBot(connector);

bot.dialog('/', function (session) {
    session.endDialog("I heard: %s", session.message.text);
});

mongoose.connect(process.env.DB_URI).then(() => {

    //LET'S DO IT!
    //botsfactory.install(bot, server, mongoose.connection.db, process.env.DB_URI)

    // Handle Bot Framework messages
    server.post('/api/messages', connector.listen());

    const listener = server.listen(process.env.PORT || 8989, function () {

        console.log('Bot started listening on', listener.address().address, listener.address().port);
    });
});













