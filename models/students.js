module.exports = function(sequelize, DataTypes) {

  var Student = sequelize.define("Student", {
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
      type:DataTypes.STRING,
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









