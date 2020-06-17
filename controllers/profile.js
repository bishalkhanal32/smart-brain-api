const handleProfileGet = db => (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({id: id})
		.then(user => {
			if(user.length) {
				res.json(user[0])
			} else {
				res.status(400).json('Not found')
			}
		})
		.catch(err => res.status(400).json('error getting user'));
	// let found = false;
	// database.forEach( user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		res.status(200).json(user);
	// 	}
	// })
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
}

module.exports = {
	handleProfileGet
}