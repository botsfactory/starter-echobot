//@ts-check
const path = require('path');
const mongoose = require('mongoose');
const botbuilder = require('botbuilder');
const express = require("express");
const botsfactory = require('@botsfactory/botsfactory');

const connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const server = express();
var bot = new botbuilder.UniversalBot(connector);

// Initial dialog - Echo bot
bot.dialog('/', function (session) {
    session.endDialog("I heard: %s", session.message.text);
});

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/starter-echobot';

mongoose.connect(DB_URI).then(() => {

    //LET'S DO IT!
    botsfactory.install({
        bot,
        server,
        db: mongoose.connection.db,
        dbUri: DB_URI
    });

    // Handle Bot Framework messages
    server.post('/api/messages', connector.listen());

    const listener = server.listen(process.env.PORT || 8989, function () {

        console.log('Bot started listening on', listener.address().address, listener.address().port);
    });
});













