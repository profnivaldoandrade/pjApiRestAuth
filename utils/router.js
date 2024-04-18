import express from 'express'
import * as Users from '../controllers/users.js'

export function init(api) {
    // Create a new Recipe
    const router = express.Router();
    router.get('/users', Users.listar);
    api.use('/users', router);
}