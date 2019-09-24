import React from 'react';
import ProductsGrid from './productsGrid'
import { Box, Heading } from 'grommet'
import PropTypes from 'prop-types'



const ProductsPage = (props) => {
  const { productsList } = props
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
ProductsPage.propTypes = {
productsList: PropTypes.arrayOf(PropTypes.any).isRequired,
}
export default ProductsPage;
