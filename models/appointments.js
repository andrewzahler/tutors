module.exports = function(sequelize, DataTypes) {

    var Appointment = sequelize.define("Appointment", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: [["math", "reading", "webDevelopment"]]
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                isAfter: "2017-05-01",
                isBefore: "2018-12-31",
                notEmpty: true,
            }
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isDecimal: true,
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                notEmpty: true
            }
        }

    }, {
        classMethods: {
            associate: function(models) {
                Appointment.belongsTo(models.Tutor, {
                    foreignKey: {
                        allowNull: false
                    },
                    primaryKey: true
                });
                Appointment.belongsTo(models.Student, {
                    foreignKey: {
                        allowNull: false
                    },
                    primaryKey: true
                });
            }
        }
    });
    return Appointment;
};