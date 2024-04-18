import sequelize from 'sequelize'
import {conn} from '../data/conection.js'

export const Users = conn.define('users',{
    nome:{
        type: sequelize.STRING,
        allowNull: false
    },
    email:{
        type: sequelize.STRING,
        allowNull: false
    },
    password:{
        type: sequelize.STRING,
        allowNull: false
    },
    level:{
        type: sequelize.INTEGER,
        defaultValue: 1
    }
})

Users.sync({force: false})