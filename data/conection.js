import sequelize from 'sequelize'

export const conn = new sequelize('unifeob_2024_api','admin','12345678',{
    host: 'unifeob-mysql.cn6aw048eksf.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
})
