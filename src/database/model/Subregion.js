const { Model, DataTypes } = require("sequelize");

class Subregion extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        country: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Subregion;
