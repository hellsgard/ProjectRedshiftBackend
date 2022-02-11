const Sequelize = require('sequelize')

const sequelize = new Sequelize ('redshift', '****', '****', {
    dialect: 'mysql',
    host: 'redshiftdev.cpd8frupo8ft.eu-west-2.rds.amazonaws.com',
});

module.exports = sequelize;
