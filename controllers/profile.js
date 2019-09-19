const handleProfile = (request, response, db) => {
	const {id} = request.params;
	//let found = false;
	//We run a forEach loop to loop through the elements in the array with matching data.
	db.select('*').from('users')
	.where({
		id: id
	})
	.then(user => {
		//console.json(user);
		if (user.length) {
			response.json(user[0])
		} else {
			response.status(400).json("User not Found")
		}
	})
	.catch(error => response.status(400).json("Error getting user")) 
	// database.users.forEach( user => {
	// 	if(user.id === id) {
	// 		found = true;
	// 		return response.json(user);
	// 	}
	// })
	// if (!found) {
	// 	response.status(400).json("Sorry! User not found");
	// }
}

module.exports = {
	handleProfile: handleProfile
};