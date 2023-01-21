export const image = (width?: number, height?: number) => {
  width = width ?? (10 - Math.floor(Math.random() * 8 + 1)) * 100
  height = height ?? (10 - Math.floor(Math.random() * 8 + 1)) * 100
  return `https://picsum.photos/${width}/${height}`
  // return `https://loremflickr.com/${width}/${height}`
  // return `https://placekitten.com/${width}/${height}`
  // return `https://placebeard.it/${width}x${height}`
}
