const { Sequelize, DataTypes } = require('sequelize');

const postgresConnection  = require(`${__dirname}/../config/config.js`)["postgres"];

const sequelize = new Sequelize(
    postgresConnection.dbName,
    postgresConnection.username,
    postgresConnection.password, {
        host: postgresConnection.host,
        dialect: postgresConnection.dialect
    }
);

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }