const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const userSchema = new Schema({
    email:{
        type :String,
        required : true,
        trim :true,
        unique: true
    },
    sifre:{
        type :String,
        required : true,
        trim :true
    }

},{collection : 'kullanicilar' , timestamps : true});


// userSchema.methods.joiValidation = function (userObject) {
//     const schema = Joi.object({
//         email : Joi.string().trim().required().email(),
//         sifre: Joi.string().trim().required().min(6).max(15)
//     });

//     return schema.validate(userObject);
// }

userSchema.methods.generateToken = async function (){
    const girisYapanUser = this;
    const token = await jwt.sign({_id:girisYapanUser._id},"secretkey",{expiresIn : "1h"}); 
    const refreshToken = await jwt.sign({_id:girisYapanUser._id},"secretkey",{expiresIn : "180d"});

    return {token,refreshToken};
}


userSchema.statics.girisYap = async (email,sifre) => {

    const user = await User.findOne({email})

    if (!user) {
        throw createError(400, "Girilen e-mail veya şifre hatalı");
    }
    
    const sifreKontrol = await bcrypt.compare(sifre, user.sifre);
    if (!sifreKontrol) {
        throw createError(400, "Girilen e-mail veya şifre hatalı");
    }

    return user;
} 




const User = mongoose.model('User',userSchema);


module.exports = User;

