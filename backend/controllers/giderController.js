const { UNSAFE_NavigationContext } = require("react-router-dom");
const Gider = require("../models/giderModel");

var createError = require('http-errors');


const giderleriListele = async (req,res) => {
    const tumGiderler = await Gider.find({user:req.headers.user});
    res.json(tumGiderler);
}

const giderEkle = async (req,res) => {
    try {
        console.log("işteşu",req.body);
        
        const eklenecekGider =  new Gider(req.body);
        const sonuc = await eklenecekGider.save();
        

        res.send(sonuc);
    } catch (error) {
        console.log("gider eklenirken hata oldu");
        
    }    
}

const giderSil = async (req,res,next) => {
    const {gider_id} = req.params;

    try {
           const deleted = await Gider.findByIdAndDelete(gider_id)

           if (deleted) {
            return res.json({mesaj : "kullanıcı silindi"});
           } else {
            throw createError(404,"kullanıcı bulunamadı");
           }

           
    } catch (e) {
        next(e);
    }
}

module.exports = {
    giderleriListele,
    giderEkle,
    giderSil
}