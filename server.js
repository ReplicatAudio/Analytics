const express = require('express');
const app = express();

const db = require('./db');

let port = 1337;
if(process.argv[2])
{
    const safePort = parseInt(process.argv[2]);
    if(isNaN(safePort)==false)
    {
        port = safePort;
    }
    else
    {
        console.log('Port must be an integer! Got: '+process.argv[2]);
        console.log('Port will default to '+port);
    }
}

const analytics = require('./analytics');

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