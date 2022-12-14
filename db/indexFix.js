const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname+'/databaseFix.sqlite',
    logging: false,
});

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
    'createdAt': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    'updatedAt': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    // Other model options go here
    timestamps: false
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
    'createdAt': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    'updatedAt': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    // Other model options go here
    timestamps: false
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
    'createdAt': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    'updatedAt': {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    // Other model options go here
    timestamps: false
});

module.exports = {
    Downloads,
    Actions,
    Logs
}