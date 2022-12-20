import axios from 'axios'



axios.interceptors.request.use(
   function (config) {
      const {origin} = new URL(config.url);

      const allowedOrigins = ["http://localhost:3000/api"];
      const token = localStorage.getItem("access-token");

      console.log(token);
      
      if (allowedOrigins.includes(origin)) {
         console.log(token);
         
      }

      return config
   },
   function (error) {
      return console.log("api dosyasında hata çıktı", error);
   }
)

export const gelirleriGetir = async () => {
   const {data} = await axios.get('http://localhost:3000/api/gelirler')

   return data;
}

export const gelirleriKaydet = async (input) => {
   const {data} = await axios.post('http://localhost:3000/api/gelirler',input)

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
   const {data} = await axios.get('http://localhost:3000/api/users/me', { headers: {"Authorization" : `Bearer ${localStorage.getItem('access-token')}`}});

   return data
   
}