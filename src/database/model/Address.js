const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(connection) {
    super.init(
      {
        user: DataTypes.INTEGER,
        city: DataTypes.INTEGER,
        subregion: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        country: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Address;
