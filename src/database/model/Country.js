const { Model, DataTypes } = require("sequelize");

class Country extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        currency: DataTypes.STRING,
      },
      { sequelize: connection }
    );
  }
}

module.exports = Country;
