const { Model, DataTypes } = require("sequelize");

class Account extends Model {
  static init(connection) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        amount: DataTypes.DOUBLE,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Account;
