const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Tourist_Activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficult: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            }
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        season: {
            type: DataTypes.ENUM('Verano','Otoño', 'Primavera', 'Invierno')
        }
    }, {
        timestamps: false,
    })
}