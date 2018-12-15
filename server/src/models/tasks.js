module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('tasks', {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT(100),
        allowNull: false
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Tasks;
};
