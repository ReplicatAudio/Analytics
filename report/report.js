const fs = require('fs');
const db = require('../db');
const sequelize = require("sequelize");
const { Op } = require("sequelize");

async function actions(opt){
    /*
    filter
    limit
    */
    const limit = opt.limit || 1000;
    const query = {};
    if (opt.filter)
    {
        query.where = {
            tag: {
                [Op.like]: '%' + opt.filter + '%'
            }
        };
    }
    query.order = [
        ['id', 'DESC']
    ]
    query.limit = limit;
    const json = await db.Actions.findAll(query);
    fs.writeFileSync(__dirname+'/reports/actions.json', JSON.stringify(json, null, 2));
    db.seq.close();
}
async function actionsIP(opt){
    /*
    filter
    limit
    */
    const limit = opt.limit || 1000;
    const query = {};
    query.attributes = [
        "ip",
        [sequelize.fn('COUNT', sequelize.col('ip')), 'hits'],
    ];
    if (opt.filter)
    {
        query.where = {
            tag: {
                [Op.like]: '%' + opt.filter + '%'
            }
        };
    }
    query.group = "ip";
    query.order = [
        ['hits', 'DESC']
    ]
    query.limit = limit;
    const json = await db.Actions.findAll(query);
    fs.writeFileSync(__dirname+'/reports/actions_ip.json', JSON.stringify(json, null, 2));
    db.seq.close();
}
const opt = {
    //filter: 'gw',
    limit: 1000
}
actions(opt);
actionsIP(opt);