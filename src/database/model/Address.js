const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(connection) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        street: DataTypes.STRING,
        house_number: DataTypes.STRING,
        neighbourhood: DataTypes.INTEGER,
        city: DataTypes.INTEGER,
        state: DataTypes.INTEGER,
        country: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Address;
