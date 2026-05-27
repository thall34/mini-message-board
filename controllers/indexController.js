const db = require('../db/queries');

async function displayMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render('index', { messages: messages });
};

function displayForm(req, res) {
    res.render('form');
};

async function addMessage(req, res) {
    const messageText = req.body.messageText;
    const messageName = req.body.messageName;

    await db.addMessage(messageText, messageName);
    res.redirect('/');
};

async function displayMessageDetails(req, res) {
    const id = req.params.id;
    const message = await db.getMessageById(id);

    if (!message) {
        return res.status(404).send('Message Not Found');
    };

    res.render('message', { message: message });
};

async function deleteMessage(req, res) {
    const id = req.params.id;
    await db.deleteMessage(id);
    res.redirect('/');
};

function displayError(req, res) {
    res.render('404');
};

module.exports = {
    displayMessages,
    displayForm,
    addMessage,
    displayMessageDetails,
    deleteMessage,
    displayError
};