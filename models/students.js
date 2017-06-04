module.exports = function(sequelize, DataTypes) {


  var Student = sequelize.define("Student", {
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
        is: ["^[a-z]+$",'i'],
        }
      },
    phone: {
      type: DataTypes.STRING,
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
      }
    }, {
      classMethods: {
        associate: function(models) {
          Student.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
              }
            });
          Student.hasMany(models.Appointment, {
            onDelete: "cascade"
            });
          }
        }
      });
  return Student;

};









