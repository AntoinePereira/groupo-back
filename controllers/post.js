const db = require('../config/database');

exports.getAllPosts = (req, res, _next) => {
	let sql = `SELECT post.id, post.post_title, post.post, post.user_id, post.date, user.nom, user.prenom FROM post INNER JOIN user ON post.user_id = user.id ORDER BY date`
	 db.query(sql, (err, result) => {
	 	if(err) throw err;
	 	res.send(result);
	 })
}

exports.getOnePost = (req, res, _next) => {
	 let sql = `SELECT * FROM post WHERE id=?`;
	 let id = req.params.id;

	 db.query(sql, id, (err, result) => {
				if(err) throw(err);
				res.send(result);
			})
}

exports.createPost = (req, res, _next) => {
	let title = req.body.title;
	let post = req.body.post;
	let userId = req.body.userId;
	let sql = `INSERT INTO post (post_title, post, user_id, date ) VALUES (?,?,?,NOW())`;

	db.query(sql, [title, post, userId], (err, result) => {
		if(err) throw(err);
		res.status(201).json({ message: "post posted!" });
	});
}

exports.modifyPost = (req, res, _next) => {
	let id = req.params.id;
	let	title = req.body.title;
	let	post = req.body.post;
	let sql = `UPDATE post SET post=?, post_title=? WHERE id= ?`;
	
	db.query(sql,[post, title, id], (err, result) => {
	 	if(err) throw err;
	 	res.send(result);
	 })
}


exports.deletePost = (req, res, _next) => {
	let id = req.params.id;
	let sql = `DELETE FROM post WHERE id= ?`;

	 db.query(sql, id, (err, result) => {
	 	if(err) throw err;
	 	res.send(result);
	 })
}
