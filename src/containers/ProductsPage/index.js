import React, { useState, useEffect } from 'react';
import Products from './products'
import axios from '../../utils/API';


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
    <div>
      Products
      < Products />
    </div>

)
}

export default ProductsPage;
