export const image = (
  width?: number,
  height?: number,
  genre: 'general' | 'profile' | 'cats' = 'general',
) => {
  width = width ?? (10 - Math.floor(Math.random() * 8 + 1)) * 100
  height = height ?? (10 - Math.floor(Math.random() * 8 + 1)) * 100

  switch (genre) {
    case 'general': {
      return `https://picsum.photos/${width}/${height}`
    }
    case 'profile': {
      return `https://placebeard.it/${width}x${height}`
    }
    case 'cats': {
      return `https://placekitten.com/${width}/${height}`
    }
  }
}
