import React from 'react'
import { useQuery  } from 'react-query'

import { Box, color, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Gidergrafik } from "../Pages/Grafik/grafikGider";
import { Gelirgrafik } from "../Pages/Grafik/grafikGelir";
import { Grafikanaliz } from "../Pages/Grafik/analiz";
import {gelirleriGetir} from '../api'
ChartJS.register(ArcElement, Tooltip, Legend);
function AnaSayfa() {

  const { isLoading, error, data } = useQuery('gelir:getir', gelirleriGetir )

  if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message

   const gelirVeri = data;

  return (
    <div>
      
      <Grid
  h='200px'
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4}
>
  
  <GridItem rowSpan={1} colSpan={3} > <Heading as='h3' size='lg'>Analiz</Heading> <br></br><Grafikanaliz gelirVeri={gelirVeri}></Grafikanaliz></GridItem>


  <GridItem rowSpan={1} colSpan={1} > <Heading as='h3' size='lg'>Gelirler</Heading> <br></br><Gelirgrafik></Gelirgrafik></GridItem>
  
  <GridItem rowSpan={1} colSpan={1} > <Heading as='h3' size='lg'>Giderler</Heading> <br></br><Gidergrafik></Gidergrafik></GridItem>
  <br></br>
</Grid>
      
    </div>
  )
}

export default AnaSayfa
