const { Model, DataTypes } = require("sequelize");

class Card extends Model {
  static init(connection) {
    super.init(
      {
        owner_id: DataTypes.INTEGER,
        card_number: DataTypes.STRING,
        total_limit: DataTypes.DOUBLE,
        available_limit: DataTypes.DOUBLE,
        is_active: DataTypes.BOOLEAN,
        experation_date: DataTypes.DATEONLY,
        security_code: DataTypes.STRING,
      },
      { sequelize: connection }
    );
  }
}

module.exports = Card;
