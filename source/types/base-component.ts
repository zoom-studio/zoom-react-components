import {
  HTMLAttributes,
  ReactNode,
  RefObject,
  MouseEvent,
  CSSProperties,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

export interface BaseComponent<Container extends HTMLElement = HTMLDivElement> {
  containerProps?: Omit<HTMLAttributes<Container>, 'className' | 'id' | 'ref' | 'style' | 'onClick'>
  children?: ReactNode
  className?: string
  id?: string
  reference?: RefObject<Container>
  onClick?: (evt: MouseEvent<Container>) => void
  style?: CSSProperties
}

const VitalInputPropsObject = [
  'onChange',
  'onInput',
  'defaultChecked',
  'checked',
  'value',
  'defaultValue',
  'accept',
  'required',
  'onBlur',
  'onFocus',
  'placeholder',
  'autoFocus',
] as const
type VitalInputProps = typeof VitalInputPropsObject[number]

type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, VitalInputProps>

export interface BaseInputComponent extends InputProps {
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, VitalInputProps>
  inputRef?: RefObject<HTMLInputElement>
}

const VitalTextareaPropsObject = [
  'onChange',
  'onInput',
  'value',
  'defaultValue',
  'required',
  'onBlur',
  'onFocus',
  'placeholder',
  'onMouseUp',
  'onKeyDown',
  'autoFocus',
] as const
type VitalTextareaProps = typeof VitalTextareaPropsObject[number]

type TextareaProps = Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, VitalTextareaProps>

export interface BaseTextareaComponent extends TextareaProps {
  textareaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, VitalTextareaProps>
  textareaRef?: RefObject<HTMLTextAreaElement>
}

export interface BaseCustomComponent<ContainerProps, RefType>
  extends Omit<BaseComponent, 'containerProps' | 'reference'> {
  containerProps?: ContainerProps
  reference?: RefObject<RefType>
}
