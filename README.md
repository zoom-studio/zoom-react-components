# Zoomrc

![Zoomrc](public/brand-logo.png)

## Zoomrc is a [React](https://reactjs.org) component library with absolute customization compatibility, built in [TypeScript](https://www.typescriptlang.org)

> ### Zoomcar includes about 60 unique components that you can use to create your perfect reaction app
>
> #### Zoomrc supports both RTL and LTR languages perfectly

## Getting Started

### 1. Install Zoomrc

```bash
yarn add @zoom-studio/zoom-react-components
# Or if you are using NPM (But Yarn is strongly recommended)
npm install --save @zoom-studio/zoom-react-components
```

> ### Zoomrc currently requires React 18.2.0 or higher

### 2. Add styles to your app

```ts
import '@zoom-studio/zoom-react-components/index.css'
```

### 3. Wrap your entire app with ZoomProvider

```tsx
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ZoomProvider>
    <MyApp />
  </ZoomProvider>,
)
```

### 4. If you are using [SASS](https://sass-lang.com), you can either import Zoomrc's mixins, functions, variables and palette

> #### Note that this step is not required
>
> #### Note that the order if imports is seriously important

```tsx
@import '../node_modules/@zoom-studio/zoom-react-components/scss/palette';
@import '../node_modules/@zoom-studio/zoom-react-components/scss/variables';
@import '../node_modules/@zoom-studio/zoom-react-components/scss/functions';
@import '../node_modules/@zoom-studio/zoom-react-components/scss/mixins';
```

### 5. Import any components you need

```tsx
import React from 'react'
import { Button } from '@zoom-studio/zoom-react-components'

export default props => {
  return (
    <Button type="primary" variant="info">
      Click me!
    </Button>
  )
}
```
