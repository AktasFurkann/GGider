const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var createError = require('http-errors');


const userGiris = async (req,res,next) => {
    try {
        const user = await User.girisYap(req.body.email,req.body.sifre);
        const {token,refreshToken} = await user.generateToken();
        res.send({
            user,
            token,
            refreshToken
        })
    } catch (e) {
        next(e);
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

const userEkle = async (req,res,next) => {
    try {
        const eklenecekUser = await new User(req.body);
        const eklenenMail = eklenecekUser.email;

        const kisi = await User.findOne({email : eklenenMail})

        if (kisi) {
            throw createError(400,"bu mail zaten kullanımda");
        }
        else{
        const {token,refreshToken} = await eklenecekUser.generateToken();

            eklenecekUser.sifre = await bcrypt.hash(eklenecekUser.sifre,8);

            const user = await eklenecekUser.save();
            res.send({user,token,refreshToken});
        }
        
        
        

    } catch (error) {
        next(error)
    }    
}

const userLogout = async (req,res) => {
try {
    const token =  req.header('refresh_token');
    
    const user_id = await jwt.verify(token,'secretkey');

    delete req.headers.authorization
    console.log(user_id);
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