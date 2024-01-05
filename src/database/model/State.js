const { Model, DataTypes } = require("sequelize");

class State extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        country_id: DataTypes.INTEGER,
      },
      { sequelize: connection }
    );
  }
}

module.exports = State;
