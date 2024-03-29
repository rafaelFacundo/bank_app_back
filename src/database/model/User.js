const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        birth_date: DataTypes.DATEONLY,
        document: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = User;
