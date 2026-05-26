const messages = require('../db/tempMessages');



function displayMessages(req, res) {
    res.render('index', { messages: messages });
};

function displayForm(req, res) {
    res.render('form')
}

function addMessage(req, res) {
    const messageText = req.body.messageText;
    const messageName = req.body.messageName;

    messages.push({ text: messageText, user: messageName, added: new Date() });
    res.redirect('/');
}

function displayMessageDetails(req, res) {
    const selectedMessage = messages[req.params.id];

    if(!selectedMessage) {
        res.status(404).send('Message Not Found');
        return;
    };

    res.render('message', { message: selectedMessage });
}

module.exports = {
    displayMessages,
    displayForm,
    addMessage,
    displayMessageDetails,
}