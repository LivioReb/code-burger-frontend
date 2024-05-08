import React, { useState, useEffect } from 'react'

import HeaderProduct from '../../assets/headerMenu.svg'
import { CardProduct } from '../../components'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import {
  Container,
  ProductImg,
  CategoryButton,
  CategoriesMenu,
  ProductsContainer
} from './style'

export function Products () {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState([])

  useEffect(() => {
    async function loadCategories () {
      const { data } = await api.get('categories')

      const newCategories = [{ id: 0, name: 'Todas' }, ...data]
      setCategories(newCategories)
    }

    async function loadProducts () {
      const { data: allProducts } = await api.get('products')

      const newProduct = allProducts.map(product => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })

      setProducts(newProduct)
    }

    loadProducts()
    loadCategories()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products)
    } else {
      const newFilteredProducts = products.filter(
        product => product.category_id === activeCategory
      )

      setFilteredProducts(newFilteredProducts)
    }
  }, [activeCategory, products])

  return (
    <Container>
      <ProductImg src={HeaderProduct} alt='Logo da Products'/>
      <CategoriesMenu>
      {categories &&
      categories.map(category =>
      <CategoryButton type='button' isActiveCategory={activeCategory === category.id} key={category.id} onClick={() => { setActiveCategory(category.id) }}
      >{category.name}
      </CategoryButton>)}
      </CategoriesMenu>
      <ProductsContainer>
        {filteredProducts &&
        filteredProducts.map(product => (
          <CardProduct key={product.id} product={product}/>
        ))}

      </ProductsContainer>
    </Container>
  )
}
