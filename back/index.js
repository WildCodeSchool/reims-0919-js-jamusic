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

function verifyToken(req, res, next) {
	const bearerHeader = req.headers.authorization
	console.log(bearerHeader)
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ') // split bearerHeader in a new Array
		const bearerToken = bearer[1] // store index 1 of the newly created array in a new variable bearToken
		req.token = bearerToken
		next() // step to the next middleware
	} else {
		res.sendStatus(403)
	}
}

app.get('/', (request, response) => {
	response.send('Welcome to jaMusic Server')
})

app.route('/register').post((request, response) => {
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
									token: token
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
	const payload = {
		sub: username
	}
	if (username && password) {
		connection.query(
			'SELECT email, password FROM account WHERE email = ? AND password = ?',
			[username, password],
			(err, results) => {
				if (results.length > 0) {
					jwt.sign(payload, secret, (err, token) => {
						response.status(201).json({
							token
						})
					})
				} else {
					response.send('Mauvais email ou mot de passe!')
				}
			}
		)
	} else {
		response.send('Merci de bien entrer un email et un mot de passe!')
	}
})
// end of login route

// To retrieve user ID only
app.route('/profiles').get((request, response) => {
	const param = request.query.token
	const idProfile = request.params.id
	jwt.verify(param, secret, (err, authData) => {
		const userId = authData.sub
		if (err) {
			response.sendStatus(401)
		} else {
			connection.query(
				`SELECT profile_id FROM account WHERE email = '${userId}'`,
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
		}
	})
})

// To retrieve all datas from user (except password)
app.route('/profiles/:id')
	.get((request, response) => {
		const param = request.query.token
		const idProfile = request.params.id
		jwt.verify(param, secret, (err, authData) => {
			const userId = authData.sub
			if (err) {
				response.sendStatus(401)
			} else {
				connection.query(
					//retrieve only id 1 because we are changing database, will be updated on next PR
					`SELECT nickname, firstname, lastname FROM profile WHERE id = 1`,
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
			}
		})
	})

	// Wille be used to create your profile
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
	// Will be used to edit the profile (<Modify /> component in react)
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

app.route('/tags').get((request, response) => {
	connection.query('SELECT * from tag', (err, results) => {
		if (err) {
			response.status(500).send('Error retrieving tags')
		} else {
			response.json(results)
		}
	})
})
// End of tags routes

app.listen(port, err => {
	if (err) {
		throw new Error('Something bad happened...')
	}

	console.log(`Server is listening on ${port}`)
})
