import {
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  type MouseEvent,
  type CSSProperties,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'

export interface BaseComponent<Container extends HTMLElement = HTMLDivElement> {
  containerProps?: Omit<HTMLAttributes<Container>, 'className' | 'id' | 'ref' | 'style' | 'onClick'>
  children?: ReactNode
  className?: string
  id?: string
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
export type VitalInputProps = (typeof VitalInputPropsObject)[number]

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
type VitalTextareaProps = (typeof VitalTextareaPropsObject)[number]

type TextareaProps = Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, VitalTextareaProps>

export interface BaseTextareaComponent extends TextareaProps {
  textareaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, VitalTextareaProps>
  textareaRef?: RefObject<HTMLTextAreaElement>
}

export interface BaseCustomComponent<ContainerProps>
  extends Omit<BaseComponent, 'containerProps' | 'reference'> {
  containerProps?: ContainerProps
}
