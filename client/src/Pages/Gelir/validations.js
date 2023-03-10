import * as yup from 'yup';

const validations = yup.object().shape({
    tarih: yup.date().required("zorunlu alan"),
    aciklama: yup.string(),
    miktar: yup.number().required("zorunlu alan")
})

export default validations