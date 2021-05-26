"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Course, {
                as: "user",
                foreignKey: {
                    fieldName: "userId",
                    allowNull: false,
                },
            });
        }
    }

    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please provide a value for "first name".',
                    },
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please provide a value for "last name".',
                    },
                },
            },
            emailAddress: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please provide a value for "email address".',
                    },
                    isEmail: {
                        msg: "Please provide a correctly formatted email address.",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please provide a value for "password".',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
