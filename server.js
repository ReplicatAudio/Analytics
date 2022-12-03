const fs = require('fs');
const http = require('http');
const https = require('https');

const path = require('path');

const cors = require('cors');

const express = require('express');

const db = require('./db');
const bodyParser = require('body-parser');
const safePort = require('./safePort');
const buildLogPkg = require('./buildLogPkg');

const port = safePort(process.argv);

const app = express();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/replicataudio.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/replicataudio.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/replicataudio.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use(cors());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const trackingImgs = fs.readdirSync(__dirname+'/public/ti/');

const logger = async function (req, res, next)
{
    console.log(req.ip+' '+req.path);
    if(req.path.includes('/ti/')){
        let trackingTag = '';
        for(const img of trackingImgs){
            if(path.basename(req.path) === img){
                trackingTag = path.parse(img).name;
                break;
            }
        }
        if(trackingTag !== ''){
            const referer = req.headers.referer || 'unknown';
            console.log('Hit tracking img: '+trackingTag);
            const logPkg= {
                'ip': req.ip,
                'tag': 'ti_'+trackingTag,
                'origin': referer 
            };
            await db.Actions.create(logPkg);
        }
    }
    next();
}
app.use(logger);

app.use(express.static('public'));

app.set('json spaces', 2);//JSON formatting



app.get('/', async (req, res) => {
    res.send('OK!');
});
app.get('/status', async (req, res) => {
    res.send('OK');
});

app.post('/log', async (req, res) => {
    console.log(req.body.origin || 'sketch');
    const required = {
        'baseUrl':'required',
        'method':'required',
        'originalUrl':'_',
        'query':'[]',
        'params':'[]',
        'body':'{}',
        'ip':'required',
        'tag':'required',
        'origin':'required',
    };
    let logPkg = buildLogPkg(req.body, required);
    if(logPkg.msg != 'OK'){
        res.send(lockPkg.msg);
        return;
    }
    await db.Logs.create(logPkg.logPkg);
    res.send('OK');
});

app.post('/action', async (req, res) => {
    console.log(req.body || 'sketch');
    const required = {
        'ip': req.ip,
        'tag': 'required',
        'origin': 'required'
    };
    let logPkg = buildLogPkg(req.body, required);
    if(logPkg.msg != 'OK'){
        res.send(lockPkg.msg);
        return;
    }
    await db.Actions.create(logPkg.logPkg);
    res.send('OK');
});

app.post('/download', (req, res) => {
    console.log('Hit download');
    res.send('OK');
});

app.get('/downloadAnalytics', async (req, res) => {
    const json = await db.Downloads.findAll();
    res.json(json);
});

app.get('/logs', async (req, res) => {
    const json = await db.Logs.findAll();
    res.json(json);
});

app.get('/actions', async (req, res) => {
    const limit = req.query.limit || 1000;
    const json = await db.Actions.findAll({limit:limit});
    res.json(json);
});

app.get('/motd/lowfire', (req, res) => {
	const title = "Welcome";
	const body = "Thanks for using LowFire";
	const link = "https://replicataudio.com"
	const tag = "thanks1";
	const delimiter = "|";
	res.send(title+delimiter+body+delimiter+link+delimiter+tag);
});

app.get('/motd/greenwave', (req, res) => {
	const title = "Welcome";
	const body = "Thanks for joining the GreenWave Beta!";
	const link = "https://replicataudio.com"
	const tag = "test";
	const delimiter = "|";
	res.send(title+delimiter+body+delimiter+link+delimiter+tag);
});

app.get('/motd/generic', (req, res) => {
	const title = "Yo!";
	const body = "Thanks for choosing ReplicatAudio!";
	const link = "https://replicataudio.com"
	const tag = "test";
	const delimiter = "|";
	res.send(title+delimiter+body+delimiter+link+delimiter+tag);
});

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(port-1, () => {
	console.log('HTTP Server running on port '+port-1);
});

httpsServer.listen(port, () => {
	console.log('HTTPS Server running on port '+port);
});