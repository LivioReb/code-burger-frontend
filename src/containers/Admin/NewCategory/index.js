import React, { useState } from 'react';
import api from '../../../services/api';
import {
  Container,
  Label,
  Input,
  ButtonStyles,
  LabelUpload
} from './style';
import { ErrorMessage } from '../../../components';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewCategory() {
  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome da categoria'),
    file: Yup.mixed()
      .test('required', 'Carregue um arquivo', value => value?.length > 0)
      .test('fileSize', 'Carregue arquivos de até 2mb', value => value[0]?.size <= 200000)
      .test('type', 'Carregue apenas arquivos JPEG, PNG ou SVG', value => {
        return value && (
          value[0]?.type === 'image/jpeg' ||
          value[0]?.type === 'image/png' ||
          value[0]?.type === 'image/svg+xml'
        );
      })
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    const categoryDataFormData = new FormData();
    categoryDataFormData.append('name', data.name);
    categoryDataFormData.append('file', data.file[0]); // Correção: usar data.file[0]

    try {
      await toast.promise(api.post('categories', categoryDataFormData), {
        pending: 'Criando nova categoria...',
        success: 'Categoria criada com sucesso',
        error: 'Falha ao criar categoria'
      });

      setTimeout(() => {
        navigate('/listar-produtos');
      }, 2000);
    } catch (error) {
      console.error('Erro ao adicionar nova categoria:', error);
    }
  };

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome da Categoria</Label>
          <Input type='text' {...register("name")} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <LabelUpload>
            {fileName ? fileName :
              <>
                <CloudUploadIcon />
                Carregue a imagem da categoria
              </>
            }
            <Input
              type='file'
              accept='image/png, image/jpeg, image/svg+xml'
              {...register("file")}
              onChange={e => {
                setFileName(e.target.files[0]?.name); // Correção: usar e.target.files
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>
        <ButtonStyles >Adicionar Categoria</ButtonStyles> {/* Correção: adicionar type="submit" */}
      </form>
    </Container>
  );
}

export default NewCategory;
