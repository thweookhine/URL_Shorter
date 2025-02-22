const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Shorten = sequelize.define('Shorten', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    accessCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: "shortens",
    timestamps: true
})


// Sync the model to the database, creating the table if it doesn't exist
sequelize.sync()
  .then(() => {
    console.log("✅ Table 'shortens' created successfully!");
  })
  .catch(err => {
    console.error('❌Error creating table:', err);
  }); 
module.exports = {Shorten}