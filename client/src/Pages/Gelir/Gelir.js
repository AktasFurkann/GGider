import {  useFormik } from 'formik';
import {React ,useMemo, useState} from 'react'
import { useQuery , useMutation ,useQueryClient } from 'react-query'
import {gelirleriGetir , gelirleriKaydet , geliriSil} from '../../api';
import {
  GridItem,
  Input,
  Button,
  Grid,
Text,
  InputGroup,
  InputLeftElement,
  FormControl,
  CloseButton,
  
} from '@chakra-ui/react'

import validationSchema from './validations'
import { Popconfirm, Table } from "antd";


const current = new Date();





function Gelir() {
  

  const [filterData,setFilterData] = useState('');

  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

  const newGelirMutation = useMutation(gelirleriKaydet, {
    onSuccess: () => queryClient.invalidateQueries("gelir:getir")
  })

  const handleSubmit = async (values,bag) => {
      newGelirMutation.mutate(values)
  }

  const formik = useFormik({
    initialValues : {
        tarih:date,
        aciklama:"",
        miktar:""
    },
    validationSchema,
    onSubmit : handleSubmit    
   })
  
  const { isLoading, error, data } = useQuery('gelir:getir', gelirleriGetir )

  const queryClient = useQueryClient();


  const deleteMutation = useMutation(geliriSil ,{onSuccess : () => queryClient.invalidateQueries('gelir:getir') })
  let sortedDate = ((a, b) => Date.parse(new Date(a.tarih.split("/").reverse().join("-"))) - Date.parse(new Date(b.tarih.split("/").reverse().join("-"))))

  const columns = useMemo(() => {
    return [
      {
        title: 'Tarih',
        dataIndex: 'tarih',
        key: 'tarih',
        defaultSortOrder: 'descend',
        sorter: sortedDate,
      },
      {
        title: 'Açıklama',
        dataIndex: 'aciklama',
        key: 'aciklama',
      },
      {
        title: 'Miktar',
        dataIndex: 'miktar',
        key: 'miktar',
      },
      {
        title: 'Action',
        key:'action',
        render: (text, record) => (
          <>
          <Popconfirm
          title="are you sure"
          onConfirm={() => {deleteMutation.mutate(record._id)}}
          onCancel={() => {console.log("silnmedi")}}
          okText="yes"
          cancelText="no"
          placement='left'
          >
            <a href='/#'><CloseButton size='md' /></a>
          </Popconfirm>
          </>
        )
      }
    ];
  }, []);
 
   if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message
  

  const filtered = data.filter((item) => {
    return Object.keys(item).some((key) => 
      item[key]
      .toString()
      .toLowerCase()
      .includes(filterData.toLocaleLowerCase())
    )
  })
   

  return (
    
    <div>

    <Input placeholder='Filtrele'  value={filterData} onChange={(e) => setFilterData(e.target.value)}  width='auto'/>


<Text fontSize='3xl' w="300px">GELİRLER</Text>
          
<br></br>


<form onSubmit={formik.handleSubmit}>
        <Grid templateColumns='repeat(4, 1fr)' gap={5}>
          <GridItem>
          <FormControl>
          <Input
           name='tarih' 
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.tarih}
        borderColor="green"
        w="300px"
        placeholder="tarihi seçiniz."
        size="md"
        />
          </FormControl>
          </GridItem>
          
          <GridItem>
          <FormControl>
          <Input name='aciklama' type="text" placeholder='Açıklama Giriniz' w="400px" borderColor="green"
            onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.aciklama}/>
          </FormControl>
          </GridItem>

         <GridItem>
         <FormControl>
          <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      color='gray.300'
      fontSize='1.2em'
      children='₺'
      textColor="green"
    />
    <Input name='miktar' type="number" placeholder='Miktarı Giriniz..' w="300px"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.miktar}
    borderColor="green"
      width='200px'/>
  </InputGroup>
          </FormControl>
         </GridItem>

          
<GridItem w="100px">
<FormControl>
          <Button   w="100px" type='submit' > EKLE  </Button>
          </FormControl>
</GridItem>
          

          </Grid>
        </form>

        
        

<br>
</br>
<br>
</br>


<Table dataSource={filtered} columns={columns} rowKey="_id"/>



      

<br></br>
<br></br>




    </div>
  )
}

export default Gelir
