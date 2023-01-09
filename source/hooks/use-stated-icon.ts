import { EmojiNS, IconNS } from '../components'
import { CommonVariants } from '../types'
import { useVariable } from './use-variable'

export namespace UseStatedIcon {
  export interface Params {
    icon?: IconNS.Names
    emoji?: EmojiNS.Emojis.Names
    variant: CommonVariants
    noIconAndEmoji?: boolean
  }

  export interface Return {
    type: 'emoji' | 'icon' | 'nothing'
    name?: IconNS.Names | EmojiNS.Emojis.Names
  }

  export type TupleReturn = [Return['name'], Return['type']]
}

export const useStatedIcon = ({
  emoji,
  icon,
  variant,
  noIconAndEmoji,
}: UseStatedIcon.Params): UseStatedIcon.TupleReturn => {
  const result = useVariable<UseStatedIcon.Return>(() => {
    if (noIconAndEmoji) {
      return { type: 'nothing' }
    }

    if (emoji) {
      return { type: 'emoji', name: emoji }
    }

    if (icon) {
      return { type: 'icon', name: icon }
    }

    let stateIcon: IconNS.Names | undefined
    switch (variant) {
      case 'success': {
        stateIcon = 'check_circle_outline'
        break
      }
      case 'info': {
        stateIcon = 'info'
        break
      }
      case 'warning': {
        stateIcon = 'report_problem'
        break
      }
      case 'error': {
        stateIcon = 'error'
        break
      }
    }
    return { name: stateIcon, type: 'icon' }
  })

  return [result.name, result.type]
}
