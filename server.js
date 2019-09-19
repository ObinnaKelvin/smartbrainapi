const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const cors = require('cors');
const knex = require('knex');
const app = express();
app.use(bodyParser.json()); //Middleware
app.use(cors()); //Middleware
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'database',
    database : 'smartbrain'
  	}
});

db.select('*').from('users').then(data => {
	console.log(data);
});

// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			email: 'john@gmail.com',
// 			password: 'cookies',
// 			entries: 0,
// 			joined: new Date()
// 		},

// 		{
// 			id: '124',
// 			name: 'Kelvin',
// 			email: 'kelobyte@gmail.com',
// 			password: 'kellard',
// 			entries: 0,
// 			joined: new Date()
// 		},

// 		{
// 			id: '125',
// 			name: 'Sylvia',
// 			email: 'sylvia@gmail.com',
// 			password: 'etinan',
// 			entries: 0,
// 			joined: new Date()
// 		}

// 	],

// 	login: [
// 		{
// 			id: '',
// 			hash: '',
// 			email: 'kelobyte@gmail.com'
// 		}
// 	]
// }

app.get('/', (request, response) => {
	db.select('*').from('users')
	.then(users => {
		response.json(users);
	})
	//response.send(database.users);
})

app.post('/signin', (request, response) => {signin.handleSignin(request, response, db, bcrypt)})

app.post('/register', (request, response) => {register.handleRegister(request, response, db, bcrypt, saltRounds)})

app.get('/profile/:id', (request, response) => {profile.handleProfile(request, response, db)})

app.put('/image', (request, response) => {image.handleImage(request, response, db)})

app.post('/imageurl', (request, response) => {image.handleApiCall(request, response)})



	// bcrypt.hash(password, saltRounds, function(err, hash) {
 //    console.log(hash);
 //    // Store hash in your password DB.
	// });
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3000, () => {
	console.log('App is running on port 3000');
})



/*
API DESIGN
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT --> user

*/