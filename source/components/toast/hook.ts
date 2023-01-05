import { useContext } from 'react'

import { CommonVariants, MaybeArray } from '../../types'
import { ToastContext } from './provider'
import { ToastNS } from './toast'

export namespace UseToastNS {
  export type Toast = Partial<ToastNS.Toast>
  export type Creator = (config: Toast) => Pick<ToastNS.Toast, 'id' | 'identifier'>
  export type DestroyById = (ids: MaybeArray<ToastNS.ID>) => void
  export type DestroyByIdentifier = (ids: MaybeArray<ToastNS.Identifier>) => void
  export type StatedToast = {
    [variant in CommonVariants]: (config: Omit<Toast, 'variant'>) => void
  }

  export interface ReturnType extends StatedToast {
    toast: UseToastNS.Creator
    destroy: {
      byId: DestroyById
      byIdentifier: DestroyByIdentifier
    }
  }
}

export const useToast = (): UseToastNS.ReturnType => {
  useContext(ToastContext)

  const toast: UseToastNS.Creator = config => {
    const id = config.id || Math.random()
    const identifier = config.identifier || 'NOT-IDENTIFIED-ZOOMRC-TOAST'
    return { id, identifier }
  }

  const destroyById: UseToastNS.DestroyById = ids => {
    if (typeof ids === 'string' || typeof ids === 'number') {
      ids = [ids]
    }
  }

  const destroyByIdentifier: UseToastNS.DestroyByIdentifier = identifiers => {
    if (typeof identifiers === 'string' || typeof identifiers === 'number') {
      identifiers = [identifiers]
    }
  }

  return {
    toast,
    neutral: conf => toast({ variant: 'neutral', ...conf }),
    success: conf => toast({ variant: 'success', ...conf }),
    info: conf => toast({ variant: 'info', ...conf }),
    warning: conf => toast({ variant: 'warning', ...conf }),
    error: conf => toast({ variant: 'error', ...conf }),
    destroy: { byId: destroyById, byIdentifier: destroyByIdentifier },
  }
}
