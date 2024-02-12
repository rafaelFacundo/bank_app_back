const { Model, DataTypes } = require("sequelize");

class key extends Model {
  static init(connection) {
    super.init(
      {
        user: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        key: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = key;
