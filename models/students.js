module.exports = function(sequelize, DataTypes) {

	var Student = sequelize.define("Student", {
		sId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		}, 
		sName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: ["^[a-z]+$",'i'],
				notEmpty: true,
			}
		},
		sPhone: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				// expects phone numbers to be entered with no symbols or spaces, i.e. 2012222552
				len: [10]
			}
		},
		sAddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sEmail: {
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
