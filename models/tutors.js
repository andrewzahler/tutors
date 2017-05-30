module.exports = function(sequelize, DataTypes) {

	var Tutor = sequelize.define("Tutor", {
		tId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		}, 
		tName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: ["^[a-z]+$",'i'],
				notEmpty: true,
			}
		},
		tPhone: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				// expects phone numbers to be entered with no symbols, i.e. 2012222552
				len: [10]
			}
		},
		tAddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tEmail: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		tSubject: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isIn: [['English', 'Math', 'Web Development']]
			}
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
				}, 
			}
	});
	return Tutor;
};
