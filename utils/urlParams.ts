type URL = Record<string, string> | URLSearchParams | string | undefined

const getParams = (url?: URL) => {
  const params = new URLSearchParams(url || window.location.search)

  return params
}

const URLParams = (url?: URL) => {
  const params = getParams(url)

  return {
    get: (param: string) => params.get(param),
    toString: () => params.toString(),
  }
}

export default URLParams
