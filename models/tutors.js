module.exports = function(sequelize, DataTypes) {

	var Tutor = sequelize.define("Tutor", {
		tid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		}, 
		tname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: ["^[a-z]+$",'i'],
				notEmpty: true,
			}
		},
		tphone: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				// expects phone numbers to be entered with no symbols, i.e. 2012222552
				len: [10]
			}
		},
		taddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		temail: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		tsubject: {
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
