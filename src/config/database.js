
const {Sequelize} = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: "localhost",
    port: 3307,
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