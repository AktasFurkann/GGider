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
  Select
} from '@chakra-ui/react'

import validationSchema from './validations'
import { Popconfirm, Table } from "antd";

const current = new Date();

function Gelir() {
  

  const [filterData,setFilterData] = useState('');

  const date = new Date().toISOString().slice(0,10);

  const newGelirMutation = useMutation(gelirleriKaydet, {
    onSuccess: () => queryClient.invalidateQueries("gelir:getir")
  })

  const handleSubmit = async (values,bag) => {
      newGelirMutation.mutate(values)
  }

  const formik = useFormik({
    initialValues : {
        user:localStorage.getItem('userid'),
        tarih:date,
        aciklama:"",
        miktar:"",
        kategori:""
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
        title: 'Kategori',
        dataIndex: 'kategori',
        key: 'kategori',
      },
      {
        title: 'Action',
        key:'action',
        render: (text, record) => (
          <>
          <Popconfirm
          title="Silmek istiyor musun?"
          onConfirm={() => {deleteMutation.mutate(record._id)}}
          onCancel={() => {console.log("silnmedi")}}
          okText="Evet"
          cancelText="Hayır"
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

    <Input left="500px" placeholder='Filtrele'  value={filterData} onChange={(e) => setFilterData(e.target.value)}  width='auto'/>


<Text fontSize='3xl' w="300px">GELİRLER</Text>
          
<br></br>


<form onSubmit={formik.handleSubmit}>
        <Grid templateColumns='repeat(4, 1fr)' gap={5}>

        <Select left="10px" id='kategori'
        value={formik.values.kategori} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}

      >
       <option value="">Seçiniz..</option>
       <option value="Kira">Kira</option>
       <option value="Maaş">Maaş</option>
       <option value="Faiz">Faiz</option>
       <option value="Prim">Prim</option>
        <option value="Diğer">Diğer</option>
      </Select>

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
<Button left="1200px" bgColor="cyan.100 " w="150px" type='submit' > EKLE  </Button>
          
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
