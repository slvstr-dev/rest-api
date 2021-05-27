const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                as: "user",
                foreignKey: {
                    fieldName: "userId",
                    allowNull: false,
                },
            });
        }
    }

    Course.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please provide a value for "title".',
                    },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please provide a value for "description".',
                    },
                },
            },
            estimatedTime: {
                type: DataTypes.STRING,
            },
            materialsNeeded: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "Course",
        }
    );

    return Course;
};
