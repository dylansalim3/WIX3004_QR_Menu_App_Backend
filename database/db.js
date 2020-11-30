const Sequelize = require("sequelize")
const db = {}


const tableName = "qr_menu_system";
const userName = "root";
const password = "123456";
const host = "47.56.87.143";
const port = 3306;
const dbDialect = "mysql";

const sequelize = new Sequelize(tableName,userName,password,{
    host: host,
    port:port,
    dialect: dbDialect,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db