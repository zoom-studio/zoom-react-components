export const addThemeToBody = () => {
  const themeKeeper = <HTMLDivElement | null>(
    document.getElementById('zoomrc-story-theme-provider')
  )

  if (!themeKeeper) {
    return null
  }

  const themeKey = 'data-theme'
  const themeValue = themeKeeper.getAttribute(themeKey)

  if (themeValue) {
    document.body.setAttribute(themeKey, themeValue)
  }
}
