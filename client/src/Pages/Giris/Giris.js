import React from 'react'
import { Flex, Heading,Box,FormControl,FormLabel,Input,Button,Alert, FormErrorMessage } from '@chakra-ui/react'
import {kullaniciGiris} from '../../api'
import { useNavigate } from 'react-router-dom';

import {useFormik} from 'formik'

import validationSchema from './validations'

import {UseAuth} from '../../contexts/authContext';


function Giris() {

const navigate = useNavigate();

const handleLogin = () => {
    navigate("/")
  }


    const {login} = UseAuth();

    const formik = useFormik({
        initialValues:{
            email:"",
            sifre:""
        },
        validationSchema,
        onSubmit: async (values ,bag) => {
            try {
                const loginResponse = await kullaniciGiris({email : values.email , sifre: values.sifre});
                if (loginResponse.hataKodu === 400 ) {
                    bag.setErrors({general : "Girilen email veya şifre hatalı"});
                }
                else{
                    console.log(loginResponse);
                    login(loginResponse);
                    handleLogin();
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
                <Heading>Giriş Yap</Heading>
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
                        value={formik.values.email}
                        >
                            </Input>                        
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl mt={4} isInvalid={formik.touched.sifre && formik.errors.sifre}>
                        <FormLabel>Şifre</FormLabel>
                        <Input name='sifre' 
                        type="password" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur} 
                        value={formik.values.sifre} ></Input>
                        <FormErrorMessage>{formik.errors.sifre}</FormErrorMessage>
                    </FormControl>

                    

                    <Button mt={4} width='full' type='submit' >
                        Giriş Yap
                    </Button>
                </form>
            </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Giris
