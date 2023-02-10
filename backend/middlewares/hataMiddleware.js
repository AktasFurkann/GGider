const hataYakala = (err,req,res,next) => {
    
    res.json({
        hataKodu: err.status,
        mesaj : err.message
    })
}

module.exports = hataYakala;