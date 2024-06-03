import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, ContainerItems } from './style';
import Orders from "./Orders";
import { SideMenuAdmin } from "../../components";
import ListProducts from "./ListProducts";
import paths from "../../constants/paths";
import NewProduct from "./NewProducts";
import EditProduct from "./EditProduct";

export function Admin() {
  const location = useLocation();
  const path = location.pathname
 console.log (path)


  return (
    <Container>
      <SideMenuAdmin path = {path}/>
      <ContainerItems>
        { path === paths.Order && <Orders/>}
        { path === paths.Products &&  <ListProducts />}   
        { path === paths.NewProduct &&  <NewProduct />}      
        { path === paths.EditProduct &&  <EditProduct />}      
      </ContainerItems>
    </Container>
  );
}

export default Admin;
