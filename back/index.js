const express = require('express')
const app = express()
const port = 3000
const connection = require('./config')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (request, response) => {
    response.send('Welcome to jaMusic Server')
})

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
                    response.status(500).send('Error adding a new profile')
                } else {
                    response.json(results)
                }
            }
        )
    })

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
                    response.status(500).send('Error adding a new profile')
                } else {
                    response.json(results)
                }
            }
        )
    })

app.route('/login')
    .post((request, response) => {
        const formData = request.body
        connection.query(
            'INSERT INTO account SET ?;',
            formData,
            (err, results) => {
                if (err) {
                    console.log(err)
                    response.status(500).send('Error registering')
                } else {
                    response.json(formData)
                    console.log(request.body)
                }
            }
        )
    })

    .get((request, response) => {
        connection.query('SELECT * from account', (err, results) => {
            if (err) {
                response.status(500).send('Cannot access accounts')
            } else {
                response.json(results)
            }
        })
    })

app.listen(port, err => {
    if (err) {
        throw new Error('Something bad happened...')
    }

    console.log(`Server is listening on ${port}`)
})
