const { Model, DataTypes } = require("sequelize");

class City extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        subregion: DataTypes.INTEGER,
        country: DataTypes.INTEGER,
      },
      { sequelize: connection }
    );
  }
}

module.exports = City;
