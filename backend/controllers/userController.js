const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userGiris = async (req,res) => {
    try {
        const user = await User.girisYap(req.body.email,req.body.sifre);
        console.log(user);
        const token = await user.generateToken();
        res.send({
            user,
            token
        })
        console.log("aleyküm selam");
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
        const eklenecekUser = await new User(req.body);
        const eklenenMail = eklenecekUser.email;

        const kisi = await User.findOne({email : eklenenMail})
        
        const token = await eklenecekUser.generateToken();
        
        if (!kisi) {
            eklenecekUser.sifre = await bcrypt.hash(eklenecekUser.sifre,8);

            const user = await eklenecekUser.save();
            res.send({user,token});
        }
        

    } catch (error) {
        console.log("selam");
        res.send(error);
    }    
}

const userLogout = async (req,res) => {
try {
    const token =  req.header('access_token').replace('Bearer ','');
    
    const user_id = await jwt.verify(token,'secretkey');

    delete req.headers.authorization
    console.log(req);
    console.log("bunedirlo");
    res.json("success message");
} catch (error) {
    res.json(error);
}
}


module.exports = {
    userEkle,
    userGetir,
    userGiris,
    userLogout
}