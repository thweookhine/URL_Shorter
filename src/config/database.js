
const {Sequelize} = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DB_HOST || 'mysql',  // Change 'localhost' to 'mysql'
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql"
})

const connect =(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connection to MySQL has been established successfully.")
    } catch(err) {
        console.error("❌ Unable to connect to the database:", err);
    }
})

connect();

module.exports = {sequelize}