const router = require('express').Router();
const User = require('../models/userModel');
var createError = require('http-errors');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const hataMiddleware = require('../middlewares/hataMiddleware.js');

router.get("/", userController.userGetir);

router.get("/me" , authMiddleware , async (req,res,next) => {
	try {

		if (req.payload) {

			const user = await User.findById(req.payload._id);
			
			res.send(user);
		}

	} catch (e) {
		console.log("yakaladın beni" , e);
		res.json("hata");
	}
})

router.post("/refresh_token" ,async (req,res,next) => {
	// try {
	// 	const token = req.header('refresh_token').replace('Bearer ','');
	// 	console.log(token);		
	// 	const sonuc = await jwt.verify(token , 'secretkey');

	
	// 	console.log(sonuc);
	// 	console.log("bunedirlo");
	// 	res.json("selam")
	// } catch (error) {
	// 	res.json(error);
	// }
	
	try {
		console.log(req.body.refresh_token);
		const authorizationToken = req.body.refresh_token;
		console.log(authorizationToken);
		const sonuc = jwt.verify(authorizationToken, "secretkey")
		console.log(sonuc._id);
		
		 const user = await User.findById(sonuc._id);
console.log(user);
		 const {token,refreshToken} = await user.generateToken();
		 res.send({user,token,refreshToken});
	} catch (e) {
		console.log(e);
	}
})

router.post("/", userController.userEkle);

router.post("/giris", userController.userGiris);
router.post("/logout", userController.userLogout);

module.exports = router;