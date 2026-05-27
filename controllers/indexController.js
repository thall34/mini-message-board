const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

const validateMessage = [
    body('messageName').trim()
    .notEmpty().withMessage('Name is required.')
    .isAlphanumeric().withMessage('Name must be alphanumeric (abc123).'),
    body('messageText').trim()
    .notEmpty().withMessage('Message text is required.')
    .isLength({ max: 100 }).withMessage('Message text can only be 100 characters max.')
    .escape(),
];

async function displayMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render('index', { messages: messages });
};

function displayForm(req, res) {
    res.render('form');
};

const addMessage = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('form', {
                errors: errors.array(),
            });
        }

        const { messageText, messageName } = matchedData(req);
        await db.addMessage(messageText, messageName);
        res.redirect('/');
    }
];

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