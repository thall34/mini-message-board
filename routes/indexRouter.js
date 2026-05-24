const { Router } = require('express');
const indexRouter = Router();

const messages = [
    {
        text: 'Hi There!',
        user: 'Amanda',
        added: new Date(),
    },
    {
        text: 'Hello World!',
        user: 'Charles',
        added: new Date(),
    },
];

indexRouter.get('/', (req, res) => {
    res.render('index', { messages: messages });
});

indexRouter.get('/new', (req, res) => {
    res.render('form');
});

indexRouter.post('/new', (req, res) => {
    const messageText = req.body.messageText;
    const messageName = req.body.messageName;

    messages.push({ text: messageText, user: messageName, added: new Date() });
    res.redirect('/');
});

indexRouter.get('/message/:id', (req, res) => {
    const selectedMessage = messages[req.params.id];

    if(!selectedMessage) {
        res.status(404).send('Message Not Found');
        return;
    };

    res.render('message', { message: selectedMessage });
});

module.exports = indexRouter;