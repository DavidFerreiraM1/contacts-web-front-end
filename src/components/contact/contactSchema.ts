import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nome é obrigatório')
    .max(20, 'Nome não deve conter mais de 20 caracteres'),
  nickname: Yup.string()
    .max(10, 'Apelido não deve ter mais de 10 caracteres'),
  email: Yup.string()
    .matches(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{1,3}\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Email inválido'),
  phone1: Yup.string()
    .required('Número de telefone é obrigatório')
    .matches(/^\d{2}\D\9\D\d{4}-\d{4}$/g, 'Número de telefone inválido'),
  phone2: Yup.string()
    .required('Número de telefone é obrigatório')
    .matches(/^\d{2}\D\9\D\d{4}-\d{4}$/g, 'Número de telefone inválido'),
});
