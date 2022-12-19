import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup.string().required("zorunlu alan").email("gerçerli bir email giriniz"),
    sifre: yup.string().min(5,"parola en az 5 karakter olmalıdır").required("zorunlu alan"),
    sifreOnay: yup.string().oneOf([yup.ref("sifre")],"Parolalar uyuşmuyor").required("zorunlu alan")
})

export default validations