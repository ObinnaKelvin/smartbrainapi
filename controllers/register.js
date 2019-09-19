
const handleRegister = (request, response, db, bcrypt, saltRounds) => {
	const {name, email, password} = request.body;
	//Hashing the Password received from the form(request.body)
	if (!name || !email || !password) {
		return response.status(400).json('incorrect form data submission');
	}
	const hash = bcrypt.hashSync(password, saltRounds);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				name: name,
				email: loginEmail[0],
				joined: new Date()
			})
			.then(user => response.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
		
		.catch(error => response.status(400).json("Unable to Register")) //This response is very fine as a good Security measure. 
	
}

module.exports = {
	handleRegister: handleRegister
};