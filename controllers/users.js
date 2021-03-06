const db = require('../config/database');

exports.getAllUsers = (req, res, _next) => {
	 let sql = `SELECT * FROM user ORDER BY id`
	 db.query(sql, (err, result) => {
	 	if(err) throw err;
	 	res.send(result);
	 })
}

exports.getOneUser = (req, res, _next) => {
	 let sql = `SELECT * FROM user WHERE id=?`;
	 let id = req.params.id;
	 
	 db.query(sql, id, (err, result) => {
				if(err) throw(err);;
				res.send(result);
			})
}

exports.deleteUser = (req, res, _next) => {
	let id = req.params.id;
	let sql = `DELETE FROM user WHERE id= ?`;

	 db.query(sql, id, (err, result) => {
	 	if(err) throw err;
	 	res.send(result);
	 })
}
