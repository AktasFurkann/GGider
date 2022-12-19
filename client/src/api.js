import axios from 'axios'

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