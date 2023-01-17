import React from 'react';
import { useQuery  } from 'react-query'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { giderleriGetir } from "../../api";



ChartJS.register(ArcElement, Tooltip, Legend); 

export function Gidergrafik() {
  const { isLoading, error, data } = useQuery('gider:getir', giderleriGetir )

  if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message

  // data.map((veri,index) => {veri.filter(datas => console.log(datas.kategori) )})

  const marketHarcama = data.filter(veri => veri.kategori === "market");
  const aracHarcama = data.filter(veri => veri.kategori === "araç");
  const faturaHarcama = data.filter(veri => veri.kategori === "fatura");
  const eglenceHarcama = data.filter(veri => veri.kategori === "eğlence");
  const yemekHarcama = data.filter(veri => veri.kategori === "yemek");
  const digerHarcama = data.filter(veri => veri.kategori === "diğer");
    
  
  const fatura = faturaHarcama.map((veri) => Number(veri.miktar));
  const market = marketHarcama.map((veri) => Number(veri.miktar));
  const arac = aracHarcama.map((veri) => Number(veri.miktar));
  const eglence = eglenceHarcama.map((veri) => Number(veri.miktar));
  const yemek = yemekHarcama.map((veri) => Number(veri.miktar));
  const diger = digerHarcama.map((veri) => Number(veri.miktar));

  const topla = (a,b) => a + b;

  
   
  const veriler = {  
    labels: ['Fatura', 'Market', 'Araç', 'Eğlence', 'Yemek', 'Diğer'],
    datasets: [
      {
        label: "Harcanan Miktar",
        data: [
          fatura.length !==0 ? fatura.reduce(topla) : null,
          market.length !==0 ? market.reduce(topla) : null,
          arac.length !==0 ? arac.reduce(topla) : null,
          eglence.length !==0 ? eglence.reduce(topla) : null,
          yemek.length !==0 ? yemek.reduce(topla) : null,
          diger.length !==0 ? diger.reduce(topla) : null
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={veriler} />;
}
