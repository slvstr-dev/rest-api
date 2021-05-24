"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "userId" });
        }
    }

    Course.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            estimatedTime: DataTypes.STRING,
            materialsNeeded: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Course",
        }
    );

    return Course;
};
