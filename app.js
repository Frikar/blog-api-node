// Env variables
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {connectDb} = require('./database/db.js')
const {User, Post, Counters} = require('./models')
const morganBody = require('morgan-body')
const seed = require("./database/seed")
const {errorHandling} = require('./middlewares/error')

const app = express();

//Config
app.use(bodyParser.json())
app.use(cors())
app.set('json spaces', 4)

//Solo activar en desarrollo, si esta vacio se mantiene la data en la BD
const eraseDatabaseOnStart = process.env.DELETE_ON_CREATE

//Logs Middleware
morganBody(app, {logRequestBody: false, logResponseBody: false});

//Import Routes
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

app.get('/', (req, res) => {
	res.json({"version": "v1.0.0"})
});

//Error Middleware
app.use(errorHandling)

connectDb().then(async () => {
	if (eraseDatabaseOnStart) {
		console.log("Eliminando toda la data")
		await Promise.all([
			User.deleteMany({}),
			Post.deleteMany({}),
			Counters.deleteMany({})
		]);
		await seed.createUsersWithPost();
	}
	app.listen(process.env.PORT, () =>
		console.log(`Wortise Blog listening on port ${process.env.PORT}!`),
	);
});
