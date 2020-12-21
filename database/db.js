const Sequelize = require("sequelize")
const db = {}

const tableName = process.env.db_table_name;
const userName = process.env.db_username;
const password = process.env.db_password;
const host = process.env.db_host;
const port = process.env.db_port;
const dbDialect = process.env.db_dialect;

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