const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '1b2e7d33c0ed401eba5a015ad93e66c9'
});

const handleApiCall = (request, response) => {
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
      .then(data => {
      	response.json(data);
      })
      .catch(error => response.status(400).json("Unable to work with API"))
}

const handleImage = (request, response, db) => {
	const {id} = request.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		response.json(entries);
		// console.log(entries);
	})
	.catch(error => response.status(400).json("Unable to get entries"));

	// let found = false;
	// database.users.forEach( user => {
	// 	if(user.id === id){
	// 		found = true;
	// 		user.entries++;
	// 		return response.json(user.entries);
	// 	}
	// })
	// if (!found) {
	// 	response.status(400).json("Not Found");
	// }
}

module.exports = {
	handleApiCall,
	handleImage
	//handleImage: handleImage
};