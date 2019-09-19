const handleSignin = (request, response, db, bcrypt) => {
	const{email, password} = request.body;
	if (!email || !password) {
		return response.status(400).json('incorrect form data submission');
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(user => {
		const isValid = bcrypt.compareSync(password, user[0].hash);
		if(isValid) {
			db.select('*').from('users')
			.where('email', '=', email)
			.then(data => {
				response.json(data[0]);
			})
			.catch(error => response.status(400).json('Unable to fetch user'));
		}
		else {
			response.status(400).json('Wrong Credentials');
		}
	})
	.catch(error => response.status(400).json('Wrong Credentials'))
	// bcrypt.compare("ketchup", '$2b$12$hqFos.QmZXuoJ1fdmopcF.vNTcHXzqUqDKzfrYCmUHkQtRCXBPvHC', function(err, res) {
	// 	console.log("first guess: ", res);
 //    // res == true
	// });
	// bcrypt.compare("veggies", '$2b$12$hqFos.QmZXuoJ1fdmopcF.vNTcHXzqUqDKzfrYCmUHkQtRCXBPvHC', function(err, res) {
	// 	console.log("second guess: ", res);
	//     // res = false
	// });
	// if(request.body.email === database.users[0].email &&
	// 	request.body.password === database.users[0].password){
	// 	response.json(database.users[0]);
	// } else {
	// 	response.status(400).json("Error Login");
	// }

	//response.json("Signed In");
}

module.exports = {
	handleSignin: handleSignin
};