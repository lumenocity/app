import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Polyline } from 'react-native-svg'

const TransactionsIcon = ({ stroke, height, width }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    stroke={stroke}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <Polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </Svg>
)

TransactionsIcon.propTypes = {
  stroke: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default TransactionsIcon
