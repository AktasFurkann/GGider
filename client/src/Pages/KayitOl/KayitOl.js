import React from 'react'
import { Flex, Heading,Box,FormControl,FormLabel,Input,Button,Alert, FormErrorMessage } from '@chakra-ui/react'
import {kullaniciKayit} from '../../api'

import {useFormik} from 'formik'

import validationSchema from './validations'

import {UseAuth} from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom'


function KayitOl() {

  const navigate = useNavigate();


    const {login} = UseAuth();

    const formik = useFormik({
        initialValues:{
            email:"",
            sifre:"",
            sifreOnay:""
        },
        validationSchema,
        onSubmit: async (values ,bag) => {
            try {
                const registerResponse = await kullaniciKayit({email : values.email , sifre: values.sifre});
                if (registerResponse.hataKodu === 400 ) {
                    bag.setErrors({general : "Bu e-mail kullanımda"})
                }
                else{
                    console.log(registerResponse);
                    login(registerResponse);
                    navigate("/");
                }                
            } catch (e) {
                console.log(e);
            }
        }
    })

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
            <Box>
                <Heading>Kayıt Ol</Heading>
            </Box>
            <Box my={5}>
                {
                    formik.errors.general && (
                        <Alert status='error'>
                            {formik.errors.general}
                        </Alert>
                    )
                }
            </Box>
            <Box my={5} textAlign="left">
                <form onSubmit={formik.handleSubmit} >
                    <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                        <FormLabel>E-mail</FormLabel>
                            <Input name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}>
                            </Input>              

                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>          
                    </FormControl>

                    <FormControl mt={4} isInvalid={formik.touched.sifre && formik.errors.sifre}>
                        <FormLabel>Şifre</FormLabel>
                        <Input name='sifre'
                         type="password" 
                         onChange={formik.handleChange} 
                         onBlur={formik.handleBlur} 
                         value={formik.values.sifre} 
                         ></Input>

                        <FormErrorMessage>{formik.errors.sifre}</FormErrorMessage>

                    </FormControl>

                    <FormControl mt={4} isInvalid={formik.touched.sifreOnay && formik.errors.sifreOnay}>
                        <FormLabel>Şifre Onay</FormLabel>
                        <Input name='sifreOnay' 
                        type="password" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur} 
                        value={formik.values.sifreOnay} 
                        
                        
                        ></Input>
                        <FormErrorMessage>{formik.errors.sifreOnay}</FormErrorMessage>
                    </FormControl>

                    <Button mt={4} width='full' type='submit' >
                        Kayıt Ol
                    </Button>
                </form>
            </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default KayitOl
