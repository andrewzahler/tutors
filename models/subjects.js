module.exports = function(sequelize, DataTypes) {

	var Subject = sequelize.define("Subject", {
		subid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		}, 
		subname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isIn: [['English', 'Math', 'Web Development']]
			}
		}, 
		subdescription: {
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
