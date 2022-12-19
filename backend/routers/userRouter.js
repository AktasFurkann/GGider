const router = require('express').Router();

const userController = require('../controllers/userController.js');

router.get("/", userController.userGetir);

router.post("/", userController.userEkle);

router.post("/giris", userController.userGiris);

module.exports = router;