import React from 'react';
import { useQuery  } from 'react-query'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { gelirleriGetir } from "../../api";



ChartJS.register(ArcElement, Tooltip, Legend); 

export function Gelirgrafik() {
  const { isLoading, error, data } = useQuery('gelir:getir', gelirleriGetir )

  if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message

  // data.map((veri,index) => {veri.filter(datas => console.log(datas.kategori) )})
  

  const kiraGelir = data.filter(veri => veri.kategori === "kira");
  const maasGelir = data.filter(veri => veri.kategori === "maaş");
  const faizGelir = data.filter(veri => veri.kategori === "faiz");
  const primGelir = data.filter(veri => veri.kategori === "prim");
  const digerGelir = data.filter(veri => veri.kategori === "diğer");
    
  
  const kira = kiraGelir.map((veri) => Number(veri.miktar));
  const maas = maasGelir.map((veri) => Number(veri.miktar));
  const faiz = faizGelir.map((veri) => Number(veri.miktar));
  const prim = primGelir.map((veri) => Number(veri.miktar));
  const diger = digerGelir.map((veri) => Number(veri.miktar));

  console.log(kira);
  const topla = (a,b) => a + b;

  
   
  const veriler = {  
    labels: ['Kira', 'Maaş', 'Faiz', 'Prim', 'Diğer'],
    datasets: [
      {
        label: "Gelir Miktarı",
        data: [
          kira.length !==0 ? kira.reduce(topla) : null,
          maas.length !==0 ? maas.reduce(topla) : null,
          faiz.length !==0 ? faiz.reduce(topla) : null,
          prim.length !==0 ? prim.reduce(topla) : null,
          diger.length !==0 ? diger.reduce(topla) : null
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={veriler} />;
}
