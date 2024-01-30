const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(connection) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        city: DataTypes.INTEGER,
        subregion: DataTypes.INTEGER,
        country: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Address;
