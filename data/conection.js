import sequelize from 'sequelize'

export const conn = new sequelize('api_unifeob_2024','root','12345678',{
    host: 'localhost',
    dialect: 'mysql'
})
