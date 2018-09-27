module.exports = function(sequelize, DataTypes) {
  var party = sequelize.define(
    "party",
    {
      party_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "party_id"
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      age_mininum: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      alcohol: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      additional_info: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photoURLs: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      freezeTableName: true
    }
  );

  return party;
};
