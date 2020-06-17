const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const signin = require('./controllers/signin.js');
const register = require('./controllers/register');
const imagelink = require('./controllers/imagelink');
const profile = require('./controllers/profile');
const app = express();

var knex = require('knex');
const db = knex({
	  client: 'pg',
	  connection: {
		    host : '127.0.0.1',
		    user : 'postgres',
		    password : '152207',
		    database : 'smart-brain'
		}
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

const database = [
	{
		id: '123',
		name: 'yash',
		email: 'yash@gmail.com',
		password: 'apples',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'mahesh',
		email: 'mahesh@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()
	}
]

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.json("accessing home")})
app.get('/profile/:id', profile.handleProfileGet(db))
app.post('/signin', signin.handleSignin(bcrypt, db))
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) })
app.put('/image', (req, res) => { imagelink.handleImageLink(req, res, db) })
app.post('/imageurl', (req, res) => { imagelink.handleApiCall(req, res, db) })

app.listen(3001, ()=>{
	console.log("app is running on port 3001")
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/