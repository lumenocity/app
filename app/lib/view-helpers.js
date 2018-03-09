import { Dimensions } from 'react-native'

const viewport = {
  width: viewportWidth,
  height: viewportHeight
} = Dimensions.get('window')

export const percentOfViewport = (percentageOrPoints, direction = 'width') => {
  // If the argument is a number like 50, change it to a decimal
  const percentage = (percentageOrPoints > 1) ? percentageOrPoints / 100 : percentageOrPoints

  return Math.round(viewport[direction] * percentage)
}

export const preciseRound = (number, precision = 2) => {
  const factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}