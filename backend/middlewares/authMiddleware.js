const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('http-errors');


const auth = async (req,res,next) => {
    
        const authorizationToken = req.headers["authorization"];
        if (!authorizationToken) {
            // res.json("token yok");
            next(createError(404,"token yok"));
        }else{
            jwt.verify(authorizationToken, "secretkey", (err, payload) => {
            if (err) {
                console.log("hataburda:" +err);
                    
                next(createError(401,err));
            }
    
            req.payload = payload;
            next();
        });
        }
        

        // if (req.headers.authorization) {
        
        // const token =  authorizationToken.replace('Bearer ','');
        // const sonuc = jwt.verify(token,'secretkey');
        // req.payload = sonuc;    
        // }
        
        
        // next();
        
    }


module.exports = auth;

// try {
//     const token =  req.header('Authorization').replace('Bearer ','');

//     console.log(token);
// if (!token) {

//  const sonuc = jwt.verify(token,'secretkey');
//  console.log(req);
//     req.user = await User.findById({_id : sonuc._id});
// }
    
    
//     next();