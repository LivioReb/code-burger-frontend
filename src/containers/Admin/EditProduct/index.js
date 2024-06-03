import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import {
  Container,
  Label,
  Input,
  ButtonStyles,
  LabelUpload
} from './style';
import ReactSelect from 'react-select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from '../../../components';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';


function EditProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state
  console.log(product)
  console.log(product.name)




  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preço do produto'),
    category: Yup.object().required('Escolha uma categoria'),  
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  


  const onSubmit = async data =>{
    const productDataFormData = new FormData()
    
    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])
    productDataFormData.append('offer', data.offer)

    try {

      await toast.promise(api.put(`products/${product.id}`, productDataFormData), {
        pending: 'Editando novo produto...',
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar produto'
      })
  
    }  catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }

    setTimeout(() => {
      navigate('/listar-produtos')
    }, 2000);
  };

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

      console.log(data)
      setCategories(data)
    }
    loadCategories()
  }, [])




  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)} >
        <div>
          <Label>Nome</Label>
          <Input type='text' {...register("name")} 
         defaultValue={ product.name}/>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Preço</Label>
          <Input type='number'  {...register("price")} 
        defaultValue={ product.price }/>
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>
        <div>
          <LabelUpload>
            {fileName ? fileName :
              <><CloudUploadIcon /> Carregue a imagem do produto </>
            }
            <Input
              type='file'
              accept='image/png, image/jpeg, image/svg+xml'
              {...register("file")}
              onChange={value => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name='category'
            control={control}
            defaultValue={product.category }
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={cat => cat.name}
                  getOptionValue={cat => cat.id}
                  placeholder="Categorias"
                  defaultValue={product.category}
                  />
              )
            }}
          ></Controller>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>
          <input type='checkbox'  {...register("offer")} 
      defaultChecked={product.offer } />
        <ButtonStyles>Adicionar produto</ButtonStyles>
      </form>
    </Container>
  );
}

export default EditProduct;
