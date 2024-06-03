import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import {
  Container,
  Img,
  EditIconStyles
} from './style';

import formatCurrency from '../../../utils/formatCurrency';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import paths from '../../../constants/paths';



 function ListProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState()
  
 useEffect(() => {
    async function loadOrders() {
        const { data } = await api.get('products')
      console.log(data)
        setProducts(data)
    }
    loadOrders()
}, [])

function isOffer(offertatus){
  if(offertatus){
    return <CheckCircleIcon style={{color: "#228B22" }}/>
  }
  return <CancelIcon style={{color: "#CC1717"  }}/>
}

function editProduct(product){
  navigate(paths.EditProduct,  {state: { product}})

}

  return (
    <Container>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell align='center'>Produto em Oferta</TableCell>
            <TableCell align='center'>Imagem do Produto</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && 
            products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell align='center'>{isOffer(product.offer)}</TableCell>
              <TableCell align='center'><Img src={product.url} alt='imagem-produto'/></TableCell>
              <TableCell>
                <EditIconStyles onClick={() => editProduct(product)}/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

export default ListProducts;
