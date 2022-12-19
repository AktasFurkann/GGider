import React from 'react'
import { Flex, Heading,Box,FormControl,FormLabel,Input,Button,Alert } from '@chakra-ui/react'
import {kullaniciKayit} from '../../api'

import {useFormik} from 'formik'

import validationSchema from './validations'

import {useAuth} from '../../contexts/authContext';

function KayitOl() {

    const {login} = useAuth();

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
                console.log(registerResponse);
                if (registerResponse.code === 11000 ) {
                    bag.setErrors({general : "Bu e-mail kullanımda"})
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
                    <FormControl>
                        <FormLabel>E-mail</FormLabel>
                            <Input name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        isInvalid={formik.touched.email && formik.errors.email}>
                            </Input>                        
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Şifre</FormLabel>
                        <Input name='sifre' type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.sifre} isInvalid={formik.touched.sifre && formik.errors.sifre}></Input>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Şifre Onay</FormLabel>
                        <Input name='sifreOnay' type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.sifreOnay} isInvalid={formik.touched.sifre && formik.errors.sifreOnay}></Input>
                    </FormControl>

                    <Button mt={4} width='full' type='submit'>
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
