const express = require('express')
const {errorHandler} = require('./middlewares/errorHandler');
const { router } = require('./routes/shortenRoute');
const { rateLimit } = require('express-rate-limit');
const { sequelize } = require('./config/database');

require('dotenv').config()

const app = express();
app.use(express.json())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: "Too many requests from this IP, please try again later."
})
app.use(limiter)

// Sync all models
const syncModels = async () => {
    await sequelize.sync({
        alter: true,
        // force: true
    });
    console.log("✅ All models synced.");
}

app.use("/api", router)
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})