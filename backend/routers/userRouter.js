const router = require('express').Router();
const User = require('../models/userModel');

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

router.post("/", userController.userEkle);

router.post("/giris", userController.userGiris);
router.post("/logout", userController.userLogout);

module.exports = router;