/**
 *
 * LoadingIndicator
 *
 */

import React from 'react'
import { DotLoader } from 'react-spinners'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const LoadingArea = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

function LoadingIndicator(props) {
  const { size, color } = props
  return (
    <LoadingArea>
      <DotLoader size={size} sizeUnit="em" color={color} />
    </LoadingArea>
  )
}

LoadingIndicator.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
}

LoadingIndicator.defaultProps = {
  color: '#000000',
}

export default LoadingIndicator
