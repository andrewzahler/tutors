module.exports = function(sequelize, DataTypes) {
    var Tutor = sequelize.define("Tutor", {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i']
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                // expects phone numbers to be entered with no symbols, i.e. 2012222552
                len: [10]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        subjects: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Tutor.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
                Tutor.hasMany(models.Appointment, {
                    onDelete: "cascade"
                });
            }
        }
    });
    return Tutor;
};
