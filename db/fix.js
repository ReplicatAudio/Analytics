// Convert from sqlite to mysql
// remove timestamps from seqeulize
// add manual fields for created updated

// sqlite3 databaseFix.sqlite .dump > sqlite.sql && bash sqlite3-to-mysql.sh sqlite.sql > mysql.sql && rm sqlite.sql

// mysql analytics < mysql.sql

const db = require('./indexFix');
async function fix(){
    await db.Actions.sync();
    let targets = await db.Actions.findAll();
    for(let target of targets){
        //console.log(target);
        target.time = new Date(target.time).toISOString().slice(0, 19).replace('T', ' ');;
        target.createdAt = new Date(target.createdAt).toISOString().slice(0, 19).replace('T', ' ');;
        target.updatedAt = new Date(target.updatedAt).toISOString().slice(0, 19).replace('T', ' ');;
        console.log(target.createdAt);
        await target.save();
    }
    await db.Downloads.sync();
    targets = await db.Downloads.findAll();
    for(let target of targets){
        //console.log(target);
        target.time = new Date(target.time).toISOString().slice(0, 19).replace('T', ' ');;
        target.createdAt = new Date(target.createdAt).toISOString().slice(0, 19).replace('T', ' ');;
        target.updatedAt = new Date(target.updatedAt).toISOString().slice(0, 19).replace('T', ' ');;
        console.log(target.createdAt);
        await target.save();
    }
    await db.Actions.sync();
    targets = await db.Logs.findAll();
    for(let target of targets){
        //console.log(target);
        target.time = new Date(target.time).toISOString().slice(0, 19).replace('T', ' ');;
        target.createdAt = new Date(target.createdAt).toISOString().slice(0, 19).replace('T', ' ');;
        target.updatedAt = new Date(target.updatedAt).toISOString().slice(0, 19).replace('T', ' ');;
        console.log(target.createdAt);
        await target.save();
    }
}
fix();