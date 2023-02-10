const Gelir = require("../models/gelirModel");

const gelirleriListele = async (req,res) => {
    const tumGelirler = await Gelir.find({user:req.headers.user});
    res.json(tumGelirler);
}

const gelirEkle = async (req,res) => {
    try {
        const eklenecekGelir =  new Gelir(req.body);
        const sonuc = await eklenecekGelir.save();
        

        res.send(sonuc);
    } catch (error) {
        console.log("gelir eklenirken hata oldu" + error);
        
    }    
}

const gelirSil = async (req,res) => {
    const {gelir_id} = req.params;

    try {
           const deleted = await Gelir.findByIdAndDelete(gelir_id)

           res.send(deleted);
    } catch (error) {
        console.log("veri silinirken hata oluştu!" + error);
    }
}

module.exports = {
    gelirleriListele,
    gelirEkle,
    gelirSil
}