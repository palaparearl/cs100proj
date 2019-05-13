const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const expressValidator = require('express-validator');
const jwt = require('jsonwebtoken');
var Storage = require('dom-storage');
var multer = require('multer');
const path = require('path');

const mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'palapar',
	database: 'social_net',
	multipleStatements: true
});

mysqlConnection.connect((err)=>{
	if(!err)
		console.log('DB connection succeeded.');
	else
		console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.get('/', (req, res) => {
	console.log('connected!');
 	res.send({message: 'APi is working'});
});

app.get('/home', function(req, res) {
    res.render('../frontend/src/components/SignUp');
});

app.post('/signup', (req, res)=>{
	const {name, username, password, email, birthday} = req.body
	const add_user_query = 'insert into user (name, username, password, email, birthday) values (?, ?, ?, ?, ?)'
	const errors = []
	mysqlConnection.query(add_user_query, [name, username, password, email, birthday], (err, results)=>{
		if(!err){
			console.log("User added.")
			return res.json({
				success: true
			})
		}
		else{
			console.log("Error!")
			return res.json({
				success: false
			})
		}
	})
})

app.post('/login', (req, res)=>{
	const {username, password} = req.body
	const find_user_query = 'select * from user where username = ?'
	const errors = []
	mysqlConnection.query(find_user_query, [username], (err, results)=>{
		if(err || results.length === 0){
			return(res.send({
				success: false
			}))
		}

		if(err || results[0].password !== password){
			return(res.send({
				success: false
			}))
		}

		const tokenPayload = {
			_id: results[0].id
		}

		const token = jwt.sign(tokenPayload, 'THIS_IS_A_SECRET')

		return res.send({
			success: true,
			token,
			username: results[0].username
		})

		console.log("Successful!")
	})
})

app.post('/edit-name', (req, res)=>{
	const {username, name} = req.body
	const edit_name_query = 'update user set name = ? where username = ?'
	const errors = []
	mysqlConnection.query(edit_name_query, [name, username], (err, results)=>{
		if(!err){
			console.log("Name edited.")
			return res.json({
				success: true
			})
		}
		else{
			console.log("Error!")
			return res.json({
				success: false
			})
		}
	})
})

app.post('/edit-password', (req, res)=>{
	const {username, oldPassword, newPassword} = req.body
	const verify_password_query = 'select * from user where username = ?'
	const edit_password_query = 'update user set password = ? where username = ?'
	const errors = []
	mysqlConnection.query(verify_password_query, [username], (err, results)=>{
		if(err || results.length === 0 || results[0].password !== oldPassword){
			console.log("Error!")
			return res.json({
				success: false
			})
		}
		else{
			mysqlConnection.query(edit_password_query, [newPassword, username], (err, results)=>{
				if(!err){
					console.log("Password edited.")
					return res.json({
						success: true
					})
				}
				else{
					console.log("Error!")
					return res.json({
						success: false
					})
				}
			})
		}
	})
})

app.post('/edit-email', (req, res)=>{
	const {username, email} = req.body
	const edit_email_query = 'update user set email = ? where username = ?'
	const errors = []
	mysqlConnection.query(edit_email_query, [email, username], (err, results)=>{
		if(!err){
			console.log("Email edited.")
			return res.json({
				success: true
			})
		}
		else{
			console.log("Error!")
			return res.json({
				success: false
			})
		}
	})
})

app.post('/edit-birthday', (req, res)=>{
	const {username, birthday} = req.body
	const edit_birthday_query = 'update user set birthday = ? where username = ?'
	const errors = []
	mysqlConnection.query(edit_birthday_query, [birthday, username], (err, results)=>{
		if(!err){
			console.log("Birthday edited.")
			return res.json({
				success: true
			})
		}
		else{
			console.log("Error!")
			return res.json({
				success: false
			})
		}
	})
})

app.post('/edit-about', (req, res)=>{
	const {username, about} = req.body
	const edit_about_query = 'update user set about = ? where username = ?'
	const errors = []
	mysqlConnection.query(edit_about_query, [about, username], (err, results)=>{
		if(!err){
			console.log("About edited.")
			return res.json({
				success: true
			})
		}
		else{
			console.log("Error!")
			return res.json({
				success: false
			})
		}
	})
})

app.get('/get-profile-details/:profile_username', (req, res)=>{
	const profile_username = req.params.profile_username
	const get_profile_query = 'select * from user where username = ?'
	const errors = []
	mysqlConnection.query(get_profile_query, [profile_username], (err, results)=>{
		if(!err){
			return res.json({
				details: results
			})
		}
		else{
			console.log("Error!")
			res.send(err)
		}
	})
})

app.get('/get-search-results/:search_string', (req, res)=>{
	const search_string = "%" + req.params.search_string + "%"
	const get_search_results_query = 'select * from user where name like ?'
	const errors = []
	mysqlConnection.query(get_search_results_query, [search_string], (err, results)=>{
		if(!err){
			console.log("Results.")
			return res.json({
				searchResults: results
			})
		}
		else{
			console.log("Error!")
			res.send(err)
		}
	})
})

app.post('/send-request', (req, res)=>{
	const {username, profileUsername} = req.body
	const send_request_query = 'insert into friend_requests (sender, receiver) values (?, ?)'
	const errors = []
	mysqlConnection.query(send_request_query, [username, profileUsername], (err, results)=>{
		if(!err){
			console.log("Friend Request Sent.")
			return res.json({
				success: true
			})
		}
		else{
			console.log("Error!")
			return res.json({
				success: false
			})
		}
	})
})

app.get('/check-relation/:username/:profileUsername', (req, res)=>{
	const username = req.params.username
	const profileUsername = req.params.profileUsername
	const check_relation_query = 'select * from friend_requests where sender = ? && receiver = ?'
	const errors = []
	mysqlConnection.query(check_relation_query, [username, profileUsername], (err, results)=>{
		if(!err && results.length !== 0){
			return res.json({
				connected: "true"
			})
		}
		else{
			const check_relation_query_2 = 'select * from friends_list where (first_friend = ? && second_friend = ?) || (first_friend = ? && second_friend = ?)'
			const errors_2 = []
			mysqlConnection.query(check_relation_query_2, [username, profileUsername, profileUsername, username], (err, results)=>{
				if(!err && results.length !== 0){
					return res.json({
						connected: "true"
					})
				}
				else{
					return res.json({
						connected: "false"
					})
				}
			})
		}
	})

})

app.get('/get-friends/:username', (req, res)=>{
	const username = req.params.username
	const get_friends_query = 'select * from friends_list where first_friend = ? || second_friend = ?'
	const errors = []
	mysqlConnection.query(get_friends_query, [username, username], (err, results)=>{
		if(!err){
			return res.json({
				userArray: results
			})
		}
		else{
			console.log("Error!")
			res.send(err)
		}
	})
})

app.get('/get-friend-requests/:username', (req, res)=>{
	const username = req.params.username
	const get_friend_requests_query = 'select * from friend_requests where receiver = ?'
	const errors = []
	mysqlConnection.query(get_friend_requests_query, [username], (err, results)=>{
		if(!err){
			return res.json({
				userArray: results
			})
		}
		else{
			console.log("Error!")
			res.send(err)
		}
	})
})

app.get('/get-user/:username', (req, res)=>{
	const username = req.params.username
	const get_user_query = 'select * from user where username = ?'
	const errors = []
	mysqlConnection.query(get_user_query, [username], (err, results)=>{
		if(!err){
			return res.json({
				results: results
			})
		}
		else{
			console.log("Error!")
			res.send(err)
		}
	})
})

app.post('/accept-request', (req, res)=>{
	const {myUsername, friendUsername} = req.body
	const delete_request_query = 'delete from friend_requests where sender = ? && receiver = ?'
	const add_friend_query = 'insert into friends_list (first_friend, second_friend) values (?,?)'
	const errors = []
	mysqlConnection.query(delete_request_query, [friendUsername, myUsername], (err, results)=>{
		if(!err){
			mysqlConnection.query(add_friend_query, [myUsername, friendUsername], (error, outputs)=>{
				if(!err){
					return res.json({
						success: true
					})
				}
				else{
					return res.json({
						success: false
					})
				}
			})
		}
		else{
			return res.json({
				success: false
			})
		}
	})
})

app.post('/ignore-request', (req, res)=>{
	const {myUsername, friendUsername} = req.body
	const delete_request_query = 'delete from friend_requests where sender = ? && receiver = ?'
	const errors = []
	mysqlConnection.query(delete_request_query, [friendUsername, myUsername], (err, results)=>{
		if(!err){
			return res.json({
				success: true
			})
		}
		else{
			return res.json({
				success: false
			})
		}
	})
})

app.post('/remove-friend', (req, res)=>{
	const {myUsername, friendUsername} = req.body
	const delete_friend_query = 'delete from friends_list where (first_friend = ? && second_friend = ?) || (first_friend = ? && second_friend = ?)'
	const errors = []
	mysqlConnection.query(delete_friend_query, [myUsername, friendUsername, friendUsername, myUsername], (err, results)=>{
		if(!err){
			return res.json({
				success: true
			})
		}
		else{
			return res.json({
				success: false
			})
		}
	})
})

// app.post('/checkIfLoggedIn', (req, res)=>{
// 	console.log(req.cookies)

// 	if(!req.cookies || !req.cookies.authToken){
// 		return res.send({
// 			isLoggedIn: false
// 		})
// 	}

// 	return jwt.verify(req.cookies.authToken, 'THIS_IS_A_SECRET', (err, decoded)=>{
// 		if(err){
// 			return res.send({
// 				isLoggedIn: false
// 			})
// 		}

// 		const userId = decoded._id

// 		const find_user_query = 'select * from user where user_id = ?'
// 		const errors = []

// 		mysqlConnection.query(find_user_query, [userId], (err, results)=>{
// 			if(err || results.length === 0){
// 				return res.send({
// 					isLoggedIn: false
// 				})
// 			}

// 			console.log("Success")
// 			return res.send({
// 				isLoggedIn: true
// 			})
// 		})
// 	})
// })

// app.get('/check-session', (req, res)=>{
// 	if(localStorage.getItem('loggedIn') === 'true'){
// 		var user = localStorage.getItem('userData')
// 		return res.status(200).json({
// 			userData: user,
// 			statusCode: 200
// 		});
// 	}else{
// 		return res.status(401).json({
// 			statusCode: 401
// 		});
// 	}
// })

app.listen(3001, ()=> console.log('Express server running at port number 3001'));