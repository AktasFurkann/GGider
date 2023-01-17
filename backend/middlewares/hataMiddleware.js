const hataYakala = (err,req,res,next) => {
    console.log("burdayımlan");
    console.log("errnamediyor:"+err);
    
    res.json({
        hataKodu: err.status,
        mesaj : err.message
    })
}

module.exports = hataYakala;