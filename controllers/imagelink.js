const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '232fdf77fb754120943745a927b013c8'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with api'))
}

const handleImageLink = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('*')
		.then(user => {
			res.json(user[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
	// let found = false;
	// database.forEach( user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		user.entries++;
	// 		res.json(user);
	// 	}
	// })
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
}

module.exports = {
	handleImageLink,
	handleApiCall
}