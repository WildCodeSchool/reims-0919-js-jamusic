const express = require('express')
const app = express()
const port = 3000
const connection = require('./config')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const secret = require('./secret')
const bcrypt = require('bcrypt')

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

app.route('/register').post(async (request, response) => {
	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(request.body.password, salt)
		const user = { email: request.body.email, password: hashedPassword }

		connection.query(
			'SELECT email FROM account WHERE email = ?',
			user.email,
			(err, results) => {
				if (err) {
					response.status(500).send('Problème inscription')
				} else if (results.length !== 0) {
					response.status(400).send('Email déjà utilisé')
				} else {
					connection.query(
						'INSERT INTO account SET ?',
						user,
						(err, results) => {
							if (err) {
								response
									.status(500)
									.send("Erreur pendant l'inscription.")
							} else {
								jwt.sign(user.email, secret, (err, token) => {
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
	} catch {
		response.status(500).send()
	}
})
// End of register route

app.route('/login').post((request, response) => {
	const username = request.body.email
	const password = request.body.password
	const payload = {
		iss: username
	}
	if (username && password) {
		connection.query(
			'SELECT email, password FROM account WHERE email = ?',
			[username],
			async (err, results) => {
				if (err) {
					response.status(500).send('Server error 500')
				} else if (results.length === 0) {
					response.send('Mauvais email ou mot de passe!')
				} else {
					try {
						await bcrypt.compare(
							password,
							results[0].password,
							(error, res) => {
								if (res) {
									jwt.sign(payload, secret, (err, token) => {
										response.status(201).json({
											token
										})
									})
								}
							}
						)
					} catch {
						res.status(500).send('Erreur de pass')
					}
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
		const userEmail = authData.iss
		console.log(authData)
		if (err) {
			response.sendStatus(401)
		} else {
			connection.query(
				`SELECT profile.id FROM profile INNER JOIN account ON email = '${userEmail}' WHERE profile.account_id  = account.id`,
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
			const userEmail = authData.iss
			console.log(authData)
			if (err) {
				response.sendStatus(401)
			} else {
				connection.query(
					//retrieve only id 1 because we are changing database, will be updated on next PR
					`SELECT * FROM profile WHERE id = '${idProfile}'`,
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
