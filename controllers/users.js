import express from 'express'
const userRouter = express.Router()
import { Users } from '../models/Users.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth.js'

const jwtSecret = 'hajkhskaSHkashakshakjshajkshaks'

userRouter.post('/auth', (req, res) => {

    let { email, password } = req.body

    //SELECT * FROM USERS WHERE EMAIL = ???
    Users.findOne({ where: { email: email } })
        .then(user => {
            if (user == null) {
                res.status(404)
                res.json('E-mail invalido')
            } else {
                let correct = bcryptjs.compareSync(password, user.password)
                if (correct) {
                    //res.status(200)
                    const token = jwt.sign({ id: user.id, email: user.email, level: user.level }, jwtSecret, { expiresIn: '1h' })
                    if (token == null) {
                        res.status(400)
                    } else {
                        res.status(200)
                        res.json(user.id)
                    }
                } else {
                    res.status(404)
                    res.json('Senha Incorreta')
                }
            }
        })
        .catch(erro => {
            res.sendStatus(400)
            console.log(erro)
        })


})

userRouter.get('/users', auth, (req, res) => {
    let {id, email, level} = req.loggedUser
    console.log(level)
    if(level==0){
        //SELECT * FROM USERS
        Users.findAll()
        .then(users => {
            res.status(200)
            res.json(users)
        })
        .catch(erro => {
            console.log(erro)
        })
    }else{
        res.json('Usuario sem permissão')
    }
    
})

userRouter.post('/user', (req, res) => {
    let { nome, email, password, level } = req.body

    let salt = bcryptjs.genSaltSync(10)
    let hash = bcryptjs.hashSync(password, salt)

    Users.create({
        nome: nome,
        email: email,
        password: hash,
        level: level
    })
        .then((_) => {
            res.sendStatus(200)
        })
        .catch(erro => {
            res.sendStatus(400)
            console.log(erro)
        })
})
export default userRouter