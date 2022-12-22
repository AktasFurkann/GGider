const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giderSchema = new Schema({
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
},{collection : 'giderler' , timestamps : true});

const Gider = mongoose.model('Gider',giderSchema);

module.exports = Gider;

