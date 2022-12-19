const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const userGiris = async (req,res) => {
    try {
        const user = await User.girisYap(req.body.email,req.body.sifre);
        
        const token = await user.generateToken();
        res.send({
            user,
            token
        })
    } catch (error) {
        console.log(error);
    }
}

const userGetir = async (req,res) => {
    try {
        const tumUserlar = await User.find({});
        res.json(tumUserlar);
    } catch (error) {
        console.log(error);
    }
}

const userEkle = async (req,res) => {
    try {
        const eklenecekUser =  new User(req.body);
        
        eklenecekUser.sifre = await bcrypt.hash(eklenecekUser.sifre,8);

            const sonuc = await eklenecekUser.save();
            res.send(sonuc);

    } catch (error) {
        res.send(error);
    }    
}


module.exports = {
    userEkle,
    userGetir,
    userGiris
}