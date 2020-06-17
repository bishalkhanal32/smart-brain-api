const handleSignin = (bcrypt, db) => (req, res) => {
	const { email, password } = req.body;
	if( !email || !password ) {
		return res.status(400).json('incorrect form submission');
	}
	db('login').select('*').where('email', '=', email)
		.then(data => {
			const check = bcrypt.compareSync(password, data[0].hash);
			if(check) {
				db('users').select('*').where({email})
					.then(user => {
						res.json(user[0]);
					})
					.catch(err => res.status(400).json("could not sign in"))
			} else {
				res.status(400).json("incorrect credentials")
			}
		})
		.catch(err => res.status(400).json("incorrect credentials"))
	// if(email === database[0].email && password === database[0].password) {
	// 	res.json(database[0]);
	// } else {
	// 	res.status(400).json('error logging in');
	// }
}

module.exports = {
	handleSignin: handleSignin
}

