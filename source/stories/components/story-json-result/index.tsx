import React, { FC } from 'react'

import ReactJson from 'react-json-view'
import { Button, CopyToClipboard } from '../../../components'

export namespace StoryJSONResultNS {
  export interface Props {
    data: object
    collapsed?: number
  }
}

export const StoryJSONResult: FC<StoryJSONResultNS.Props> = ({ collapsed = 2, data }) => {
  return (
    <div className="story-json-result">
      <CopyToClipboard text={JSON.stringify(data)}>
        {({ copy, state }) => (
          <Button onClick={copy} variant={state === 'copying' ? 'warning' : 'info'} size="small">
            {state === 'copied' ? 'Copied' : state === 'copying' ? 'Copying' : 'Copy data'}
          </Button>
        )}
      </CopyToClipboard>

      <ReactJson
        src={data}
        theme="ashes"
        indentWidth={2}
        iconStyle="square"
        collapsed={collapsed}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        collapseStringsAfterLength={10}
      />
    </div>
  )
}
