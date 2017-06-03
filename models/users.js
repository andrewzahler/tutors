
module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          msg:"User.Student error with foreign key"
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
          msg:"User.Student error with foreign key"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true
        }

    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Tutor, {
                    foreignKey: {
                      allowNull: false,
                      msg:"User.Tutor error with foreign key"
                    }
                });
                User.hasOne(models.Student, {
                    foreignKey: {
                      allowNull: false,
                      msg:"User.Student error with foreign key"
                    }
                });
            }
        }
    });
    return User;
};





