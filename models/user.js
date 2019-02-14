module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },

    skill: {
      type: DataTypes.STRING,
      allowNull: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    isLoggedOn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true
    },

    address2: {
      type: DataTypes.STRING,
      allowNull: true
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true
    },

    state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUppercase: true
      }
    },

    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },

    personHours: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  });
  return User;
};
