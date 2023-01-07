import { ProgressNS } from '.'
import { color, colorFnToColor } from '../../utils'

export const generateProgressColor = (
  step: ProgressNS.Step,
  defaultPercentage: number,
  failed: boolean,
  dynamicColors: boolean,
): string => {
  const percentage = step.percentage || defaultPercentage

  if (dynamicColors) {
    if (failed) {
      return color({ source: 'error' })
    }

    if (percentage >= 100) {
      return color({ source: 'success' })
    } else {
      return color({ source: 'info' })
    }
  }

  if (!step.color) {
    return color({ source: 'accent' })
  }
  if (typeof step.color === 'string') {
    return step.color
  }
  const defaultColor = colorFnToColor(step.color[0])
  const coloredPercentages = step.color[1]
  if (!coloredPercentages) {
    return defaultColor
  }
  if (coloredPercentages[percentage]) {
    return colorFnToColor(coloredPercentages[percentage])
  }
  return defaultColor
}

export const normalizePercentage = (
  percentage: number | undefined,
  defaultPercentage: number,
): number => {
  if (!percentage && percentage !== 0) {
    return defaultPercentage
  }

  if (percentage >= 100) {
    return 100
  }

  if (percentage <= 0) {
    return 0
  }

  return percentage
}
