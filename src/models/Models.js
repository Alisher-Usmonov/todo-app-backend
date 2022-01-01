const sq = require("sequelize");
module.exports = {
    async TodoModel(sequelize, Sequelize) {
        return sequelize.define("todos", {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true
            },
            text: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            completed: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        })
    }
}