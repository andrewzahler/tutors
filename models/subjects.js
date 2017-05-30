module.exports = function(sequelize, DataTypes) {

	var Subject = sequelize.define("Subject", {
		subId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		}, 
		subName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isIn: [['English', 'Math', 'Web Development']]
			}
		}, 
		subDescription: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		classMethods: {
			associate: function(models) {
				Subject.hasMany(models.Appointment, {
					onDelete: "cascade"
				});
			}
		}
	});
	return Subject;
};
