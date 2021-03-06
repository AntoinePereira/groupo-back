const db = require('../config/database');

exports.getAllComments = (req, res, _next) => {
	 let sql = `SELECT * FROM comment ORDER BY date`
	 db.query(sql, (err, result) => {
		if(err) throw err;
		res.send(result);
	 })
}

exports.getOnePostComments = (req, res, _next) => {
	let sql = `SELECT comment.id, comment.post_id, comment.comment, comment.user_id, comment.date, user.nom, user.prenom FROM comment INNER JOIN user ON comment.user_id = user.id WHERE post_id=?`;
	let postId = req.params.id;
	
	db.query(sql, postId, (err, result) => {
				if(err) throw(err);
				res.send(result);
	})
}

exports.createComment = (req, res, _next) => {
	let postId = req.body.postId;
	let comment = req.body.comment;
	let userId = req.body.userId;
	let sql = `INSERT INTO comment ( post_id, comment, user_id, date ) VALUES (?,?,?,NOW())`;

	db.query(sql, [ postId, comment, userId], (err, result) => {
		if(err) throw(err);
		res.status(201).json({ message: "comment posted!" });
	});
}

exports.modifyComment = (req, res, _next) => {
	let id = req.params.id;
	let	comment = req.body.comment;
	let sql = `UPDATE comment SET comment=?, WHERE id= ?`;

	 db.query(sql,[comment, id], (err, result) => {
		if(err) throw err;
		res.send(result);
	 })
}


exports.deleteComment = (req, res, _next) => {
	let id = req.params.id;
	let sql = `DELETE FROM comment WHERE id= ?`;

	 db.query(sql, id, (err, result) => {
		if(err) throw err;
		res.send(result);
	 })
}
