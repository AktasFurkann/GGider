const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gelirSchema = new Schema({
    user:{
        type: String,
        required: true
    },
    tarih:{
        type :String,
        required : true,
        trim :true,
    },
    miktar:{
        type :String,
        required : true,
        trim :true,
        maxlength : 10
    },
    aciklama:{
        type: String,
        required:true,
        lowercase :true,
        trim : true,
    }  
},{collection : 'gelirler' , timestamps : true});

const Gelir = mongoose.model('Gelir',gelirSchema);

module.exports = Gelir;

