const { Sequelize } = require("sequelize");
const { DB_URL } = require("../../config");
const { TodoModel } = require("../models/Models");
module.exports = async () => {
    try {
        const sequelize = new Sequelize(DB_URL, {
            logging: false
        })
        const db = {};
        db.todos = await TodoModel(sequelize, Sequelize);
        sequelize.sync({ force: false });
        return db;
    } catch (err) {
        console.log(`SQL ERROR: ${err.message}`);
    }
}