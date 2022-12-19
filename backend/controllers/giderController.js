const Gider = require("../models/giderModel");

const giderleriListele = async (req,res) => {
    const tumGiderler = await Gider.find({});
    res.json(tumGiderler);
}

const giderEkle = async (req,res) => {
    try {
        const eklenecekGider =  new Gider(req.body);
        const sonuc = await eklenecekGider.save();
        

        res.send(sonuc);
    } catch (error) {
        console.log("gider eklenirken hata oldu");
        
    }    
}

const giderSil = async (req,res) => {
    const {gider_id} = req.params;

    try {
           const deleted = await Gider.findByIdAndDelete(gider_id)

           res.send(deleted);
    } catch (error) {
        console.log("veri silinirken hata oluştu!" + error);
    }
}

module.exports = {
    giderleriListele,
    giderEkle,
    giderSil
}