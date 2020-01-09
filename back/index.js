const express = require('express')
const app = express()
const port = 3000
const connection = require('./config')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const secret = require('./secret')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    } else {
        jwt.verify(token, secret, (err, user) => {
            console.log(err)
            if (err) {
                return res.sendStatus(403)
            } else {
                req.user = user
            }
            next()
        })
    }
}

app.get('/', (request, response) => {
    response.send('Welcome to jaMusic Server')
})

app.route('/register')

    .get((request, response) => {
        connection.query('SELECT * FROM account', (err, results) => {
            if (err) {
                response.status(500).send('Impossible de récupérer les comptes')
            } else {
                response.json(results)
            }
        })
    })

    .post((request, response) => {
        const formData = request.body
        connection.query(
            'SELECT email FROM account WHERE email = ?',
            formData.email,
            (err, results) => {
                if (err) {
                    response.status(500).send('Problème inscription')
                } else if (results.length !== 0) {
                    response.status(400).send('Email déjà utilisé')
                } else {
                    connection.query(
                        'INSERT INTO account SET ?',
                        formData,
                        (err, results) => {
                            if (err) {
                                response
                                    .status(500)
                                    .send("Erreur pendant l'inscription.")
                            } else {
                                jwt.sign(formData, secret, (err, token) => {
                                    response.json({
                                        token
                                    })
                                })
                            }
                        }
                    )
                }
            }
        )
    })
// End of register route

app.route('/login').post((request, response) => {
    const username = request.body.email
    const password = request.body.password
    if (username && password) {
        connection.query(
            'SELECT email, password FROM account WHERE email = ? AND password = ?',
            [username, password],
            (err, results) => {
                if (results.length > 0) {
                    jwt.sign([username, password], secret, (err, token) => {
                        response.json({
                            token
                        })
                    })
                } else {
                    response.send('Incorrect username and/or password!')
                }
                response.end()
            }
        )
    } else {
        response.send('Please enter Username and Password!')
    }
})

// end of login route

app.route('/profiles')

    .get((request, response) => {
        connection.query('SELECT * from profile', (err, results) => {
            if (err) {
                response.status(500).send('Error retrieving profiles')
            } else {
                response.json(results)
            }
        })
    })

    .post((request, response) => {
        const formData = request.body
        connection.query(
            'INSERT INTO profile SET ?;',
            formData,
            (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).send('Error adding a new profile')
                } else {
                    response.json(results)
                }
            }
        )
    })

// End of profiles route

app.route('/profiles/:id')
    .get((request, response) => {
        const idProfile = request.params.id
        connection.query(
            'SELECT * FROM profile WHERE id = ?',
            [idProfile],
            (err, results) => {
                if (err) {
                    console.log(err)
                    response
                        .status(500)
                        .send('Erreur dans la récupération du profile')
                } else {
                    response.json(results)
                }
            }
        )
    })

    .put((request, response) => {
        const idProfile = request.params.id
        const formData = request.body
        connection.query(
            'UPDATE profile SET ? WHERE id = ?',
            [formData, idProfile],
            err => {
                if (err) {
                    console.log(err)
                    response.status(500).send('Error editing a profile')
                } else {
                    response.sendStatus(200)
                }
            }
        )
    })

// End of profiles ID routes

app.route('/tags')

    .get((request, response) => {
        connection.query('SELECT * from tag', (err, results) => {
            if (err) {
                response.status(500).send('Error retrieving tags')
            } else {
                response.json(results)
            }
        })
    })
    .post((request, response) => {
        const formData = request.body
        connection.query(
            'INSERT INTO profile SET ?;',
            formData,
            (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).send('Error adding a new profile')
                } else {
                    response.json(results)
                }
            }
        )
    })

app.listen(port, err => {
    if (err) {
        throw new Error('Something bad happened...')
    }

    console.log(`Server is listening on ${port}`)
})
