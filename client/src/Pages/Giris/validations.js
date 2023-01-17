import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup.string().required("Doldurulması zorunlu alan").email("Gerçerli bir email giriniz"),
    sifre: yup.string().min(5,"Parola en az 5 karakter olmalıdır").required("Doldurulması zorunlu alan")
})

export default validations