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

function verifyToken(request, response, next) {
	const bearerHeader = request.headers.authorization
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ') // split bearerHeader in a new Array
		const bearerToken = bearer[1] // store index 1 of the newly created array in a new variable bearToken
		try {
			request.authData = jwt.verify(bearerToken, secret)
			next() // step to the next middleware
		} catch (err) {
			response.sendStatus(401)
		}
	} else {
		response.sendStatus(403)
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
			`SELECT email FROM account WHERE email = ?`,
			[user.email],
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
								jwt.sign(
									{ sub: results.insertId },
									secret,
									(err, token) => {
										response.json({
											token
										})
									}
								)
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

	if (username && password) {
		connection.query(
			'SELECT id, email, password FROM account WHERE email = ?',
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
									jwt.sign(
										{ sub: results[0].id },
										secret,
										(err, token) => {
											response.status(201).json({
												token
											})
										}
									)
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
app.route('/profiles')
	.get(verifyToken, (request, response) => {
		const idProfile = request.authData.sub
		connection.query(
			'SELECT profile.id FROM profile WHERE profile.account_id = ?',
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

	// Will be used to create your profile
	.post(verifyToken, (request, response) => {
		const idProfile = request.authData.sub
		const formData = request.body
		connection.query(
			'INSERT INTO profile SET ?',
			{
				picture: formData.picture,
				nickname: formData.nickname,
				biography: formData.biography,
				ville: formData.ville,
				account_id: idProfile
			},
			(err, results) => {
				if (err) {
					console.log(err)
					res.status(500).send('Error adding a new profile')
				} else {
					const profile = { ...formData, id: results.insertId }
					connection.query(
						'INSERT INTO profile_has_tag SET ?',
						{
							profile_id: profile.id,
							tag_id: formData.tag
						},
						(err, results) => {
							if (err) {
								console.log(err)
								response
									.status(500)
									.send('Error adding tags on profile')
							} else {
								response.json(profile)
							}
						}
					)
				}
			}
		)
	})

// To retrieve all datas from user (except password)
app.route('/profiles/:id')
	.get(verifyToken, (request, response) => {
		const foreignId = request.params.id
		const idProfile = request.authData.sub
		if (foreignId > 0 && foreignId === idProfile) {
			connection.query(
				`SELECT id, picture, nickname, biography, ville FROM profile WHERE account_id = ?`,
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
		} else {
			connection.query(
				`SELECT id, picture, nickname, biography, ville FROM profile WHERE id = ?`,
				[foreignId],
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

	// Will be used to edit the profile (<Modify /> component in react)
	.put(verifyToken, (request, response) => {
		const idProfile = request.authData.sub
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

	app.route('/profiles/tags').get(verifyToken, (request, response) => {
		const idProfile = request.authData.sub
		connection.query('SELECT tag.name FROM tag INNER JOIN profile ON ', [idProfile],
		(err, results) => {
			if(err) {
				console.log(err)
				response.status.(500).send('Pas de tag correspondant')
			} else {
				response.json(results)
			}
		})
	})
// End of profiles ID routes

app.route('/feed').get(verifyToken, (request, response) => {
	const idProfile = request.authData.sub
	connection.query(
		'SELECT post.id, post.text, post.media, post.likes, post.share, post.date, post.profile_id, profile.picture,profile.nickname, profile.account_id FROM post INNER JOIN profile ON post.profile_id = profile.id',
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

app.route('/profiles/:id/posts').get(verifyToken, (request, response) => {
	const idProfile = request.params.id
	connection.query(
		'SELECT post.id, post.text, post.media, post.likes, post.share, post.date, post.profile_id, profile.picture,profile.nickname, profile.account_id FROM post INNER JOIN profile ON post.profile_id = profile.id WHERE profile.id = ?',
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

app.route('/profiles/tags').post(verifyToken, (request, response) => {
	const idProfile = request.authData.sub
	const formData = request.body
	connection.query(
		'INSERT INTO profile_has_tag SET ?',
		{
			profile_id: idProfile,
			tag_id: formData.tag
		},
		(err, results) => {
			if (err) {
				console.log(err)
				response.status(500).send('Error adding tags on profile')
			} else {
				response.json(results)
			}
		}
	)
})

app.route('/tags').get(verifyToken, (request, response) => {
	const idProfile = request.authData.sub
	connection.query('SELECT * from tag', idProfile, (err, results) => {
		if (err) {
			response.status(500).send('Error retrieving tags')
		} else {
			response.json(results)
		}
	})
})
// End of tags routes
app.route('/tags/:name').get(verifyToken, (request, response) => {
	const idProfile = request.params.name
	connection.query(
		'SELECT profile.nickname, tag.name FROM profile LEFT JOIN tag ON profile.id = tag.id WHERE tag.name = ?',
		[idProfile],
		(err, results) => {
			if (err) {
				console.log(err)
				response
					.status(500)
					.send(
						'Erreur dans la récupération de profils correspondants'
					)
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
