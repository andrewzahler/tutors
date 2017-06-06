module.exports = function(sequelize, DataTypes) {
    var Tutor = sequelize.define("Tutor", {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        uType: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {

            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
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
