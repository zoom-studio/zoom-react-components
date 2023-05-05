import { HTMLAttributes, ReactNode, RefObject, MouseEvent, CSSProperties, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
export interface BaseComponent<Container extends HTMLElement = HTMLDivElement> {
    containerProps?: Omit<HTMLAttributes<Container>, 'className' | 'id' | 'ref' | 'style' | 'onClick'>;
    children?: ReactNode;
    className?: string;
    id?: string;
    onClick?: (evt: MouseEvent<Container>) => void;
    style?: CSSProperties;
}
declare const VitalInputPropsObject: readonly ["onChange", "onInput", "defaultChecked", "checked", "value", "defaultValue", "accept", "required", "onBlur", "onFocus", "placeholder", "autoFocus"];
declare type VitalInputProps = typeof VitalInputPropsObject[number];
declare type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, VitalInputProps>;
export interface BaseInputComponent extends InputProps {
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, VitalInputProps>;
    inputRef?: RefObject<HTMLInputElement>;
}
declare const VitalTextareaPropsObject: readonly ["onChange", "onInput", "value", "defaultValue", "required", "onBlur", "onFocus", "placeholder", "onMouseUp", "onKeyDown", "autoFocus"];
declare type VitalTextareaProps = typeof VitalTextareaPropsObject[number];
declare type TextareaProps = Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, VitalTextareaProps>;
export interface BaseTextareaComponent extends TextareaProps {
    textareaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, VitalTextareaProps>;
    textareaRef?: RefObject<HTMLTextAreaElement>;
}
export interface BaseCustomComponent<ContainerProps> extends Omit<BaseComponent, 'containerProps' | 'reference'> {
    containerProps?: ContainerProps;
}
export {};
