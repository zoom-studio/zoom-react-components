import React, { FC, ReactNode, useEffect, useState } from 'react'

import { sleep } from '@zoom-studio/zoom-js-ts-utils'
import { useMessage } from '../message/use-message'
import { useZoomComponent } from '../../hooks'
import { logs } from '../../constants'
import { CommonVariants } from '../../types'

export namespace CopyToClipboardNS {
  export type State = 'copying' | 'copied' | 'errored' | 'initial'

  export interface ChildrenCallback {
    copy: () => void
    isLoading: boolean
    error: null
    state: State
    variant: CommonVariants
  }

  export interface Props {
    text: string
    children: ReactNode | ((handlers: ChildrenCallback) => ReactNode)
    resetTimeout?: number
    toastOnError?: boolean
    toastOnSuccess?: boolean
    errorMessage?: string
    successMessage?: string
    onCopyClicked?: () => void
  }
}

export const CopyToClipboard: FC<CopyToClipboardNS.Props> = ({
  errorMessage: providedErrorMessage,
  successMessage: providedSuccessMessage,
  resetTimeout = 2000,
  toastOnError = true,
  toastOnSuccess,
  children,
  text,
  onCopyClicked,
}) => {
  const { globalErrors, sendLog } = useZoomComponent('copy-to-clipboard')
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<CopyToClipboardNS.State>('initial')
  const [variant, setVariant] = useState<CommonVariants>('info')
  const message = useMessage()

  const errorMessage =
    providedErrorMessage ??
    globalErrors?.onCopyFailure ??
    'Error occurred while copying to clipboard'

  const successMessage =
    providedSuccessMessage ?? globalErrors?.onCopySuccess ?? 'Successfully copied to the clipboard'

  const reset = () => {
    void sleep(resetTimeout).then(() => {
      setState('initial')
    })
  }

  const copyToClipboard = () => {
    onCopyClicked?.()
    setLoading(true)
    setState('copying')

    navigator.clipboard
      .writeText(text)
      .then(onSuccess, onFailure)
      .finally(() => {
        setLoading(false)
      })
  }

  const onSuccess = () => {
    setError(null)
    setState('copied')
    reset()

    if (toastOnSuccess) {
      message.toast.success(successMessage, { playSound: false })
    }
  }

  const onFailure = (error: any) => {
    setError(error)
    setState('errored')
    reset()
    sendLog(logs.couldNotCopyToClipboard, `TEXT: ${text}`)

    if (toastOnError) {
      message.toast.error(errorMessage, { playSound: true })
    }
  }

  useEffect(() => {
    setVariant(() => {
      switch (state) {
        case 'copied': {
          return 'success'
        }
        case 'initial':
        case 'copying': {
          return 'info'
        }
        case 'errored': {
          return 'error'
        }
      }
    })
  }, [state])

  return (
    <>
      {typeof children === 'function'
        ? children({
            copy: copyToClipboard,
            isLoading: loading,
            error,
            state,
            variant,
          })
        : children}
    </>
  )
}
