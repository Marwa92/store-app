import React from 'react'
import {
  Box,
  ResponsiveContext,
  Button,
} from 'grommet'
import PropTypes from 'prop-types'
import ProductCard from '../../components/ProductCard/Loadable'
import GridView from '../../components/GridView/Loadable'


const calculateRowCount = (size) => {
  if (size === 'large') return 4
  if (size === 'medium') return 3
  return 1
}

const ProductsGrid = (props) => {
  const {
    storeProducts,
  } = props

  const storeProductCards = storeProducts.map(product => (
    <Box height="600px" key={product.ProductId}>
      <ProductCard
        image={product && product.ProductImg}
        label={product.ProductName}
        price={product.ProductPrice}
        quantity={product.AvailablePieces}
      />
    </Box>
  ))
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <GridView
          dataList={storeProductCards}
          columns={{
            count: calculateRowCount(size),
            size: 'auto',
          }}
        />
      )}
    </ResponsiveContext.Consumer>
  )
}

ProductsGrid.propTypes = {
  storeProducts: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default ProductsGrid
