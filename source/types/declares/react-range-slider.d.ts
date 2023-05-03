declare module 'react-rangeslider' {
  interface SliderProps {
    disabled?: boolean | undefined
    format?: ((value: number) => React.ReactNode) | undefined
    handleLabel?: React.ReactNode | undefined
    labels?: { [value: number]: React.ReactNode } | undefined
    max?: number | undefined
    min?: number | undefined
    onChange?: (value: number) => void
    onChangeComplete?: (value: number) => void
    onChangeStart?: (value: number) => void
    orientation?: string | undefined
    reverse?: boolean | undefined
    step?: number | undefined
    tooltip?: boolean | undefined
    className?: string | undefined
    value: number
  }

  export default class Slider extends React.Component<SliderProps> {}
}
