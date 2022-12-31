import { SelectNS } from '..'

export const DYNAMIC_SIMPLE_SELECT = (
  count = 4,
  disabled?: (index: number) => boolean,
): SelectNS.Option[] => {
  return Array.from(Array(count)).map((_, index) => ({
    label: `option ${index + 1}`,
    value: `value ${index + 1}`,
    disabled: disabled?.(index),
  }))
}

export const SIMPLE_SELECT_OPTIONS: SelectNS.Option[] = DYNAMIC_SIMPLE_SELECT()

export const SELECT_OPTIONS: SelectNS.Option[] = [
  {
    label: 'Turning a React app',
    disabled: true,
    value: Math.random(),
    options: [
      { label: 'into an', value: 1 },
      { label: 'installable PWA', value: Math.random() },
      { label: 'with offline', value: Math.random() },
      { label: 'detection', value: Math.random() },
      { label: 'service workers', value: 2 },
    ],
  },
  { label: 'and theming', value: Math.random() },
  { label: 'Recently I decided', value: 3, selected: false },
  {
    label: 'to take the dive into',
    disabled: true,
    value: Math.random(),
    options: [
      { label: 'making my web app', value: Math.random() },
      { label: 'progressive', value: Math.random() },
      { label: 'Some of the benefits', value: Math.random() },
      { label: 'are excellent caching', value: Math.random() },
      { label: 'sped up page load', value: Math.random() },
    ],
  },
  {
    label: 'times and the',
    disabled: true,
    selected: false,
    value: 4,
    options: [
      { label: 'ability for a', value: Math.random() },
      { label: 'user to install it "natively"', value: Math.random() },
      { label: 'There are definitely some', value: Math.random() },
      { label: 'gotchas and other interesting', value: Math.random() },
      { label: "tidbits which I'll", value: Math.random() },
    ],
  },
  {
    label: 'also be covering below',
    selected: false,
    value: Math.random(),
    options: [
      { label: "I'm using React", value: Math.random() },
      { label: "so I'll assume you are too", value: Math.random() },
      { label: 'If you want to jump in to the code', value: Math.random() },
      {
        label: "it's all in the mixmello GitHub repo.",
        value: Math.random(),
      },
      { label: "Let's get started!", value: Math.random() },
    ],
  },
  {
    label: 'Setting Up Service Workers',
    value: Math.random(),
    disabled: true,
  },
  {
    label: 'Create-react-app provides us',
    value: Math.random(),
    disabled: true,
  },
  {
    label: 'a couple of excellent service worker',
    value: Math.random(),
    disabled: true,
    selected: false,
  },
  { label: 'files to help us  ', value: Math.random(), disabled: true },
  { label: 'get started', value: Math.random(), disabled: true },
  {
    label: 'They automatically configure',
    value: Math.random(),
    disabled: true,
    selected: false,
  },
  { label: 'lots of useful things', value: Math.random(), disabled: true },
  {
    label: 'like caching your webpack output',
    disabled: true,
    value: Math.random(),
    options: [
      { label: "They'll pretty much contain", value: Math.random() },
      { label: 'everything we need for our PWA', value: Math.random() },
      { label: 'You can get these', value: Math.random() },
      { label: 'files by running', value: Math.random() },
      { label: 'npx create-react-app', value: Math.random() },
    ],
  },
  {
    label: 'my-app --template',
    value: Math.random(),
    options: [
      { label: 'cra-template-pwa', value: Math.random() },
      { label: 'This will give you two files', value: Math.random() },
      { label: 'you can move into your project', value: Math.random() },
      { label: 'serviceWorkerRegistration.js', value: Math.random() },
      { label: 'and', value: 8 },
    ],
  },
  {
    label: 'service-worker.js',
    value: Math.random(),
    disabled: true,
    options: [
      { label: 'Add these into /src', value: Math.random() },
      { label: 'of your project', value: Math.random() },
      {
        label: '(or use the new project provided by the command)',
        value: Math.random(),
      },
      {
        label: "I'm not going to deep dive into these files",
        value: Math.random(),
      },
      { label: 'today as they are extremely', value: Math.random() },
    ],
  },
  {
    label: 'well documented via comments',
    value: Math.random(),
    options: [
      { label: 'Now we actually', value: Math.random() },
      { label: 'need to register our service', value: Math.random() },
      { label: 'worker on launch', value: Math.random() },
      { label: 'In your app index', value: Math.random() },
      { label: 'file, import the service worker', value: Math.random() },
    ],
  },
  {
    label: 'Now simply run the',
    value: Math.random(),
    options: [
      { label: 'function with', value: Math.random() },
      { label: 'registerServiceWorker();', value: Math.random() },
      { label: 'A finished index file', value: Math.random() },
      { label: 'should look something', value: Math.random() },
      { label: 'like this', value: Math.random() },
    ],
  },
  {
    label: 'Service workers will only',
    value: Math.random(),
    options: [
      { label: 'register/run in a production build', value: Math.random() },
      { label: 'unless specifically enabled', value: Math.random() },
      { label: 'see create-react-app documentation', value: Math.random() },
      { label: 'in the extras section below', value: Math.random() },
      { label: 'This is because hot-reloading', value: Math.random() },
    ],
  },
  {
    label: 'and service worker caching',
    value: Math.random(),
    options: [
      { label: "don't mix very well!", value: Math.random() },
      { label: "This means you won't", value: Math.random() },
      { label: 'see the service worker', value: Math.random() },
      { label: 'running in', value: Math.random() },
      {
        label: 'Dev tools > Application > Service Workers',
        value: Math.random(),
      },
    ],
  },
  {
    label: 'Offline Detection & UI/UX',
    value: Math.random(),
    options: [
      { label: 'Offline detection is not', value: Math.random() },
      {
        label: 'specifically a service worker/PWA feature',
        value: Math.random(),
      },
      { label: 'however, PWAs are', value: Math.random() },
      { label: "'offline first'", value: Math.random() },
      { label: "meaning it's a good idea", value: Math.random() },
    ],
  },
  { label: 'to have code to handle', value: Math.random() },
  { label: 'offline/online state', value: Math.random() },
  { label: 'In my application', value: Math.random() },
  {
    label: 'I decided to add a little bubble',
    value: Math.random(),
    disabled: true,
  },
  { label: 'that comes down from', value: Math.random(), selected: false },
  { label: 'the top of the screen', value: Math.random() },
  { label: 'and block the page', value: Math.random() },
]
