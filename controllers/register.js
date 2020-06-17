const handleRegister = (req, res, bcrypt, db) => {
	const { name, email, password } = req.body;
	if( !name || !email || !password ) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(login_email => {
			return trx('users')
				.returning('*')
				.insert({
					name: name,
					email: login_email[0],
					joined: new Date()
				})
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(err => res.status(400).json('unable to register'));
	// database.push({
	// 	id: '125',
	// 	name: name,
	// 	email: email,
	// 	entries: 0,
	// 	joined: new Date()
	// })
	// res.json(database[database.length-1])
}

module.exports = {
	handleRegister
}