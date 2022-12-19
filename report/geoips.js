const fs = require('fs');

const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
const ipgeolocationApi = new IPGeolocationAPI("0a2676c4d43544809189db599a9fa015", false); 
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

const ips = require('./reports/actions_ip.json');

const geolocationParams = new GeolocationParams();

let scount = 0;
let fcount = 0;
let max = 501;

let out = [];

function handleResponse(json) {
    const resIP = json.ip;
    console.log('Finished: '+resIP);
    let found = false;
    for(let item  of ips)
    {
        if(item.ip.replace("::ffff:","") === resIP)
        {
            json.hits = item.hits;
            found = true;
            break;
        }
    }
    if(found === false)
    {
        json.hits = -1;
        console.log('IP NOT FOUND: '+resIP);
    }
    out.push(json);
    fcount++;
    if(fcount===max)
    {
        out.sort(function(a, b) {
            return b.hits - a.hits;
        });
        fs.writeFileSync(__dirname+"/reports/geoips.json", JSON.stringify(out, null, 2));
    }
}

function checkLocation(ip)
{
    geolocationParams.setIPAddress(ip);
    ipgeolocationApi.getGeolocation(handleResponse, geolocationParams);
}

function runIPs()
{
    for(let ip of ips)
    {
        scount++;
        if(scount > max)
        {
            return;
        }
        const addr = ip.ip.replace("::ffff:","");
        if(addr === "50.159.227.179"){
            fcount++;
            continue;
        };
        console.log(scount, addr);
        checkLocation(addr);
    }
}
runIPs();