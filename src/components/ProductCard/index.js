import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Image,
  Button,
} from 'grommet'
import blankImage from '../../assets/blank.png'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  cursor: ${props => (props.path ? 'pointer' : 'auto')};
`
const ProductCard = (props) => {
  const {
    image,
    label,
    price,
    quantity,
  } = props

  let HighlightedText
  if(quantity<11 && quantity > 0){
    HighlightedText= <Text alignSelf="center" weight="bold" color="red">{`Hurry up only ${quantity} left!`}</Text>
  } else if(quantity === 0){
  HighlightedText= <Text alignSelf="center" weight="bold" color="red">Out Of Stock</Text>
  } 
  return (
    <StyledBox height="100%" responsive>
      <Box height="80%" overflow="hidden" round="medium" responsive>
        <Image src={image || blankImage} fit="cover" />
        {HighlightedText}
      </Box>
      <Box align="center" margin="small">
        <Text weight="bold" textAlign="center">{label}</Text>
        <Text textAlign="center">{`${price} L.E.`}</Text>
      </Box>
     { quantity> 0 ? <Button label="Add To Cart" primary/> : null}
    </StyledBox>
  )
}

ProductCard.propTypes = {
  image: PropTypes.string,
  label: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  quantity: PropTypes.number.isRequired,
}

ProductCard.defaultProps = {
  image: null,
}

export default ProductCard
