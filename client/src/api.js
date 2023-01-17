import axios from 'axios'
import jwt_decode from "jwt-decode";

axios.interceptors.request.use(
   function (config) {
      
      const {origin} = new URL(config.url);

      const allowedOrigins = ["http://localhost:3000"];
      const token = localStorage.getItem("access-token");
      
      
      
       
      
      if (allowedOrigins.includes(origin)) {
         
         if (token && jwt_decode(localStorage.getItem('access-token')).exp > Math.floor(Date.now() / 1000)) {
            
         // jwt_decode(localStorage.getItem('access-token')).exp < Math.floor(Date.now() / 1000)
            config.headers.authorization = token;
            config.headers.user = localStorage.getItem('userid');

            // console.log(jwt_decode(localStorage.getItem('access-token')).exp < Math.floor(Date.now() / 1000));
            
         
         }
         
      }

      return config
   },
   function (error) {
      console.log("selam");
      return console.log("api dosyasında hata çıktı", error);
   }
)

// axios.interceptors.response.use(function (response) {
   
//    // Any status code that lie within the range of 2xx cause this function to trigger
//    // Do something with response data
//    if (response.data.hataKodu === 401) {
//       console.log("api");
      
//    }
   
//    return response;
//  }, function (error) {
//    console.log(error);
//    // Any status codes that falls outside the range of 2xx cause this function to trigger
//    // Do something with response error
//    return Promise.reject(error);
//  });


// console.log(jwt_decode(localStorage.getItem('access-token')).exp < Math.floor(Date.now() / 1000));
//       if (jwt_decode(localStorage.getItem('access-token')).exp < Math.floor(Date.now() / 1000)) {
//          const sonuc =  axios.post('http://localhost:3000/api/users/refresh_token',{ authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IyZWU3YzgzZGU1M2YyYzRlNjRkNzEiLCJpYXQiOjE2NzMwMTAwOTYsImV4cCI6MTY4ODU2MjA5Nn0.YoHfAYMA_xQbodE61BiF0RRj-7jNiv4RzI3MsU_lwwA`})
//          sonuc.then((res) =>
//           {
//             localStorage.setItem("access-token",res.data.token);
//             localStorage.setItem("refresh-token",res.data.refreshToken);
//          });

export const gelirleriGetir = async () => {
   const {data} = await axios.get('http://localhost:3000/api/gelirler')

   return data;
}

export const gelirleriKaydet = async (input) => {
   const {data} = await axios.post("http://localhost:3000/api/gelirler",input)

   return data

}

export const geliriSil = async (gelir_id) => {
   const {data} = await axios.delete(`http://localhost:3000/api/gelirler/${gelir_id}`);

   return data
}

export const giderleriGetir = async () => {
   const {data} = await axios.get('http://localhost:3000/api/giderler')

   return data;
}

export const giderleriKaydet = async (input) => {
   const {data} = await axios.post('http://localhost:3000/api/giderler',input)

   return data
}

export const giderSil = async (gider_id) => {
   const {data} = await axios.delete(`http://localhost:3000/api/giderler/${gider_id}`)

   return data
}

export const kullaniciKayit = async (input) => {
   const {data} = await axios.post('http://localhost:3000/api/users',input)
   
   return data
}

export const fetcMe = async () => {
   
      if (jwt_decode(localStorage.getItem('access-token')).exp > Math.floor(Date.now() / 1000)) {
         const {data} = await axios.get('http://localhost:3000/api/users/me');
         return data
      }
      else{
         const data = {mesaj:"jwt expired"}
         return data
      }
      
   
   
}

export const kullaniciGiris = async (input) => {
   const {data} = await axios.post('http://localhost:3000/api/users/giris' ,input);

   return data
}

export const kullaniciCikis = async () => {
   const {data} = await axios.post('http://localhost:3000/api/users/logout' , {
      access_token : localStorage.getItem('access-token'),
   });
   return data;
}

export const fetchRefresh = async () => {
   console.log("selam");
   const {data} = await axios.post('http://localhost:3000/api/users/refresh_token',{
      refresh_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IyZWU3YzgzZGU1M2YyYzRlNjRkNzEiLCJpYXQiOjE2NzMwODQxNDQsImV4cCI6MTY4ODYzNjE0NH0.veC3r5qqfxV7Qj-mmPlovg0s3_wEi3fM5hb-t7hdBuY"
   })
   console.log(data);
   return data;
}