const { Model, DataTypes } = require("sequelize");

class Neighbourhood extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        city_id: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Neighbourhood;
