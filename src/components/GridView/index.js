import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'grommet'

const GridView = (props) => {
  const { dataList, columns, gap } = props
  return (
    <Grid
      gap={gap}
      columns={columns}
    >
      {dataList}
    </Grid>
  )
}

GridView.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  gap: PropTypes.string,
  dataList: PropTypes.arrayOf(PropTypes.node).isRequired,
}

GridView.defaultProps = {
  columns: 'medium',
  gap: 'medium',
}

export default GridView
