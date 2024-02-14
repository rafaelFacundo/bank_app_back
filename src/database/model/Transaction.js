const { Model, DataTypes } = require("sequelize");

class Transaction extends Model {
  static init(connection) {
    super.init(
      {
        sender: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        receiver: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        sender_currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        receiver_currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sender_currency_value: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Transaction;
