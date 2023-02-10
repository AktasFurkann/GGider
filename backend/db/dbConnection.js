const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ggider')
    .then(() => console.log("veritabanına bağlanıldı"))
    .catch(hata => console.log("db baglantı hatası" , hata));

    console.log("hatalı la");

 