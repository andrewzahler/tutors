module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define("User", {
		uid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}, 
		email: {
			type: DataTypes.STRING,
			isEmail: true
		},

	});
	return User;
};
