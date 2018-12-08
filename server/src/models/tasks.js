module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('tasks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Tasks;
};
