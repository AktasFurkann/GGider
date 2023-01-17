import React from 'react';
import { useQuery  } from 'react-query'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

import { giderleriGetir } from "../../api";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function Grafikanaliz({gelirVeri}) {

    const { isLoading, error, data } = useQuery('gider:getir', giderleriGetir )

  if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message
    
   

//    const tarihler = gelirVeri.map((veri) => veri.tarih.slice(5,7) === "01");


   const filteredOcak = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "01")
   const filteredSubat = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "02")
   const filteredMart = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "03")
   const filteredNisan = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "04")
   const filteredMayis = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "05")
   const filteredHaziran = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "06")
   const filteredTemmuz = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "07")
   const filteredAgustos = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "08")
   const filteredEylul = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "09")
   const filteredEkim = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "10")
   const filteredKasim = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "11")
   const filteredAralik = gelirVeri.filter((veri) => veri.tarih.slice(5,7) === "12")

   const giderOcak = data.filter((veri) => veri.tarih.slice(5,7) === "01")
   const giderSubat = data.filter((veri) => veri.tarih.slice(5,7) === "02")
   const giderMart = data.filter((veri) => veri.tarih.slice(5,7) === "03")
   const giderNisan = data.filter((veri) => veri.tarih.slice(5,7) === "04")
   const giderMayis = data.filter((veri) => veri.tarih.slice(5,7) === "05")
   const giderHaziran = data.filter((veri) => veri.tarih.slice(5,7) === "06")
   const giderTemmuz = data.filter((veri) => veri.tarih.slice(5,7) === "07")
   const giderAgustos = data.filter((veri) => veri.tarih.slice(5,7) === "08")
   const giderEylul = data.filter((veri) => veri.tarih.slice(5,7) === "09")
   const giderEkim = data.filter((veri) => veri.tarih.slice(5,7) === "10")
   const giderKasim = data.filter((veri) => veri.tarih.slice(5,7) === "11")
   const giderAralik = data.filter((veri) => veri.tarih.slice(5,7) === "12")

    const ocak = filteredOcak.map((veri) => Number(veri.miktar));
    const subat = filteredSubat.map((veri) => Number(veri.miktar));
    const mart = filteredMart.map((veri) => Number(veri.miktar));
    const nisan = filteredNisan.map((veri) => Number(veri.miktar));
    const mayis = filteredMayis.map((veri) => Number(veri.miktar));
    const haziran = filteredHaziran.map((veri) => Number(veri.miktar));
    const temmuz = filteredTemmuz.map((veri) => Number(veri.miktar));
    const agustos = filteredAgustos.map((veri) => Number(veri.miktar));
    const eylul = filteredEylul.map((veri) => Number(veri.miktar));
    const ekim = filteredEkim.map((veri) => Number(veri.miktar));
    const kasim = filteredKasim.map((veri) => Number(veri.miktar));
    const aralik = filteredAralik.map((veri) => Number(veri.miktar));

    const ocakGideri = giderOcak.map((veri) => Number(veri.miktar));
    const subatGideri = giderSubat.map((veri) => Number(veri.miktar));
    const martGideri = giderMart.map((veri) => Number(veri.miktar));
    const nisanGideri = giderNisan.map((veri) => Number(veri.miktar));
    const mayisGideri = giderMayis.map((veri) => Number(veri.miktar));
    const haziranGideri = giderHaziran.map((veri) => Number(veri.miktar));
    const temmuzGideri = giderTemmuz.map((veri) => Number(veri.miktar));
    const agustosGideri = giderAgustos.map((veri) => Number(veri.miktar));
    const eylulGideri = giderEylul.map((veri) => Number(veri.miktar));
    const ekimGideri = giderEkim.map((veri) => Number(veri.miktar));
    const kasimGideri = giderKasim.map((veri) => Number(veri.miktar));
    const aralikGideri = giderAralik.map((veri) => Number(veri.miktar));


const topla = (a,b) => a + b;

const ocakAyi = ocak.length !==0 ? ocak.reduce(topla) : null;
const subatAyi = subat.length !==0 ? subat.reduce(topla) : null
const martAyi = mart.length !==0 ? mart.reduce(topla) : null
const nisanAyi = nisan.length !==0 ? nisan.reduce(topla) : null
const mayisAyi = mayis.length !==0 ? mayis.reduce(topla) : null
const haziranAyi = haziran.length !==0 ? haziran.reduce(topla) : null
const temmuzAyi = temmuz.length !==0 ? temmuz.reduce(topla) : null
const agustosAyi = agustos.length !==0 ? agustos.reduce(topla) : null
const eylulAyi = eylul.length !==0 ? eylul.reduce(topla) : null
const ekimAyi = ekim.length !==0 ? ekim.reduce(topla) : null
const kasimAyi = kasim.length !==0 ? kasim.reduce(topla) : null
const aralikAyi = aralik.length !==0 ? aralik.reduce(topla) : null

    const ocakAyiToplam = ocakGideri.length !==0 ? ocakGideri.reduce(topla) : null;
    const subatAyiToplam = subatGideri.length !==0 ? subatGideri.reduce(topla) : null
    const martAyiToplam = martGideri.length !==0 ? martGideri.reduce(topla) : null
    const nisanAyiToplam = nisanGideri.length !==0 ? nisanGideri.reduce(topla) : null
    const mayisAyiToplam = mayisGideri.length !==0 ? mayisGideri.reduce(topla) : null
    const haziranAyiToplam = haziranGideri.length !==0 ? haziranGideri.reduce(topla) : null
    const temmuzAyiToplam = temmuzGideri.length !==0 ? temmuzGideri.reduce(topla) : null
    const agustosAyiToplam= agustosGideri.length !==0 ? agustosGideri.reduce(topla) : null
    const eylulAyiToplam= eylulGideri.length !==0 ? eylulGideri.reduce(topla) : null
    const ekimAyiToplam = ekimGideri.length !==0 ? ekimGideri.reduce(topla) : null
    const kasimAyiToplam = kasimGideri.length !==0 ? kasimGideri.reduce(topla) : null
    const aralikAyiToplam = aralikGideri.length !==0 ? aralikGideri.reduce(topla) : null

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            
          },
        },
      };
      
      const labels = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
      
      console.log(labels.map(() => faker.datatype.number({ min: 0, max: 1000 })));

       const veri = {
        labels,
        datasets: [
          {
            label: 'Gelir',
            data: [ocakAyi,subatAyi,martAyi,nisanAyi,mayisAyi,haziranAyi,temmuzAyi,agustosAyi,eylulAyi,ekimAyi,kasimAyi,aralikAyi],
            backgroundColor: 'rgba(0,128,0,0.7)',
         
          },
          {
            label: 'Gider',
            data: [ocakAyiToplam,subatAyiToplam,martAyiToplam,nisanAyiToplam,mayisAyiToplam,haziranAyiToplam,
                temmuzAyiToplam,
                agustosAyiToplam,
                eylulAyiToplam,
                ekimAyiToplam,
                kasimAyiToplam,
                aralikAyiToplam ],
            backgroundColor: 'rgba(255,0,0, 0.8)',

          },
        ],
      };

  return <Bar options={options} data={veri} />;
}
