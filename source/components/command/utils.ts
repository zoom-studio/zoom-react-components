import { type CommandNS } from '.'

const ACTION_ID_PREFIX = 'zoomrc-command-action-id-'

export const isSection = (item: CommandNS.Item): item is CommandNS.Section => {
  if ('sectionName' in item) {
    return true
  }
  return false
}

export const shouldRenderAction = (action: CommandNS.Action, query: string) => {
  const keywords = action.keywords ?? `${action.description} ${action.name}`
  return keywords.includes(query)
}

export const makeActionItemId = (actionId: CommandNS.ActionID): string => {
  return `${ACTION_ID_PREFIX}${actionId}`
}

export const unmakeActionItemId = (actionId: string): string => {
  return actionId.replace(ACTION_ID_PREFIX, '')
}

export const extractActions = (items: CommandNS.Item[]): CommandNS.Action[] => {
  const actions: CommandNS.Action[] = []

  for (const item of items) {
    if (isSection(item)) {
      actions.push(...item.actions)
    } else {
      actions.push(item)
    }
  }

  return actions
}
