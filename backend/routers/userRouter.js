const router = require('express').Router();

const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.get("/", userController.userGetir);

router.get("/me" , authMiddleware ,(req,res,next) => {
    console.log("routerdayım");
    res.send(req.user);
})

router.post("/", userController.userEkle);

router.post("/giris", userController.userGiris);

module.exports = router;