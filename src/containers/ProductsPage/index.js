import React, { useState, useEffect } from 'react';
import ProductsGrid from './productsGrid'
import axios from '../../utils/API';
import { Box, Heading } from 'grommet'



const ProductsPage = () => {

  const [productsList, setProductsList] = useState([])
  async function fetchProductsAPI() {
    const response = await axios('/products');
    console.log('response:',response.data);
    setProductsList(response.data)
  }

  useEffect(() => {
    fetchProductsAPI()
  }, [])

  console.log('productsList:', productsList);
  
  return(
    <React.Fragment>
    <Heading margin="medium" size="small">Products You May Like</Heading>
    <Box margin={{ horizontal: 'xlarge' }}>
      <ProductsGrid
        storeProducts={productsList}
      />
    </Box>
  </React.Fragment>

)
}

export default ProductsPage;
