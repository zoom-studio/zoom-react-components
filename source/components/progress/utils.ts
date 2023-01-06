import { ProgressNS } from '.'
import { color, colorFnToColor } from '../../utils'

export const generateProgressColor = (step: ProgressNS.Step, defaultPercentage: number): string => {
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
  const percentage = step.percentage || defaultPercentage
  if (coloredPercentages[percentage]) {
    return colorFnToColor(coloredPercentages[percentage])
  }
  return defaultColor
}
