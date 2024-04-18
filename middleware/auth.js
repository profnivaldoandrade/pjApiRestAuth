export default function auth(req, res, next) {
    
    const authToken = req.headers['authorization']

    if (authToken != undefined) {

        const beaner = authToken.split(' ')
        let token = beaner[1]

        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.status(401)
                res.json({ err: 'invalido' })
            } else {
                req.token = token
                req.loggedUser = {id: data.id, email: data.email, level: data.level}
                //console.log(data)
                next();
            }
        })

    } else {
        res.status(401)
        res.json('Token Invalido')
    }
}
