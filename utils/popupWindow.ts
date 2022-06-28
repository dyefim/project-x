interface Dimensions {
  width: number
  height: number
}

const WIDTH = 400
const HEIGHT = 800
const POPUP_WINDOW_SETTINGS =
  'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no'

const getPopupOffset = ({ width, height }: Dimensions) => {
  const wLeft = window.screenLeft || window.screenX
  const wTop = window.screenTop || window.screenY

  const left = wLeft + window.innerWidth / 2 - width / 2
  const top = wTop + window.innerHeight / 2 - height / 2

  return { top, left }
}

const getPopupDimensions = ({ width, height }: Dimensions) => {
  const { top, left } = getPopupOffset({ width, height })

  return `width=${width},height=${height},top=${top},left=${left}`
}

export const openPopupWindow = (url: string) => {
  const dimensions = getPopupDimensions({
    width: WIDTH,
    height: HEIGHT,
  })

  return window.open(url, 'instagram', `${POPUP_WINDOW_SETTINGS},${dimensions}`)
}
