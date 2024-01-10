const { Model, DataTypes } = require("sequelize");

class City extends Model {
  static init(connection) {
    super.init(
      {
        state_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
      },
      { sequelize: connection }
    );
  }
}

module.exports = City;
