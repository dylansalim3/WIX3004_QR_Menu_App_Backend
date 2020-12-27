const Sequelize = require("sequelize")
const db = {}

const tableName = process.env.DB_TABLE_NAME;
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dbDialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(tableName, userName, password, {
    host: host,
    port: port,
    dialect: dbDialect,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        evict: 10000,
        handleDisconnects: true,
    },
    retry: {
        match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
        ],
        max: 5
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db