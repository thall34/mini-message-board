const express = require('express');
const path = require("node:path");

const app = express();
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/indexRouter');

app.use('/', indexRouter);
app.use('/{*splat}', (req, res) => {
    res.status(404).send('Page Not Found');
    return;
})

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    };

    console.log(`Mini Message Board App - listening on port ${PORT}`);
});