const Sequelize = require('sequelize')

const sequelize = new Sequelize ('redshift', 'admin', 'Wireframe123!', {
    dialect: 'mysql',
    host: 'redshiftdev.cpd8frupo8ft.eu-west-2.rds.amazonaws.com',
});

module.exports = sequelize;