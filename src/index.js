//@ts-check
const path = require('path');

const botbuilder = require('botbuilder');
const express = require("express");
const botsfactory = require('@botsfactory/botsfactory');

const connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const server = express();
var bot = new botbuilder.UniversalBot(connector);

const intents = new botbuilder.IntentDialog({ recognizers: [], recognizeOrder: botbuilder.RecognizeOrder.series })

bot.dialog('/', intents);

// Initial dialog - Echo bot 
intents.onDefault((session) => {
    session.endDialog("I heard: %s", session.message.text);
});

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/starter-echobot';

//LET'S DO IT!
botsfactory.powerUp({
    bot,
    server,
    dbUri: DB_URI
}).then((result) => {

    console.log(result);
    
    // Handle Bot Framework messages
    server.post('/api/messages', connector.listen());

    const listener = server.listen(process.env.PORT || 8989, function () {

        console.log('Bot started listening on', listener.address().address, listener.address().port);
    });
});













