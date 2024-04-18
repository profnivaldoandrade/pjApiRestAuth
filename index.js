import express from 'express'
import {conn} from './data/conection.js'
import userRouter from './controllers/users.js'

const api = express()
const Port = process.env.PORT || 3000;

conn.authenticate()
    .then((_)=>{
        console.log('\n Banco Conectado!')
    })
    .catch(erro =>{
        console.log(erro)
    })

api.use(express.urlencoded({extended: false}))
api.use(express.json())


api.use('/', userRouter)

api.listen(Port, (_)=>{
    console.log('api rodando')
})