module.exports = function(sequelize, DataTypes) {

	var Student = sequelize.define("Student", {
		sid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		}, 
		sname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: ["^[a-z]+$",'i'],
				notEmpty: true,
			}
		},
		sphone: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				// expects phone numbers to be entered with no symbols, i.e. 2012222552
				len: [10]
			}
		},
		saddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		semail: {
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
