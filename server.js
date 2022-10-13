const express = require('express');
const safePort = require('./safePort');

const app = express();

const db = require('./db');

const port = safePort(process.argv);

const analytics = require('./analytics');
const safePort = require('./safePort');

const logger = function (req, res, next)
{
    analytics.log(req);
    next();
}
app.use(logger);

app.set('json spaces', 2);//JSON formatting

app.get('/', async (req, res) => {
    res.send('OK!');
});

app.get('/download', (req, res) => {

});

app.get('/downloadAnalytics', async (req, res) => {
    const json = await db.Downloads.findAll();
    res.json(json);
});

app.get('/logs', async (req, res) => {
    const json = await db.Logs.findAll();
    res.json(json);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});