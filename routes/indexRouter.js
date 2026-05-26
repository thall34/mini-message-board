const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.displayMessages);
indexRouter.get('/new', indexController.displayForm);
indexRouter.post('/new', indexController.addMessage);
indexRouter.get('/message/:id', indexController.displayMessageDetails);

module.exports = indexRouter;