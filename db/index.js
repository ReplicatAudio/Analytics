const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: __dirname+'/database.sqlite',
//     logging: false,
// });

const sequelize = new Sequelize(
    'analytics',
    'admin',
    'Tru5tn01!',
     {
       host: '127.0.0.1',
       dialect: 'mysql',
       logging: false
     }
   );

const Logs = sequelize.define('Logs', {
    'baseUrl': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'method': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'originalUrl': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'query': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'params': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'ip': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'tag': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'origin': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'time': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    // Other model options go here
    timestamps: true
});

const Actions = sequelize.define('Actions', {
    'ip': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'tag': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'origin': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'time': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    // Other model options go here
    timestamps: true
});

const Downloads = sequelize.define('Downloads', {
    // using quotes to match report prop names
    'target': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'ip': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'origin': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'time': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    // Other model options go here
    timestamps: true
});

module.exports = {
    Downloads,
    Actions,
    Logs,
    seq: sequelize
}