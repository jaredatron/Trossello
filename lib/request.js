// ensure fetch pollyfill is loaded

export default (method, path, options={}) => {
  options.method = method

  // enables cookies by default
  if ('credentials' in options); else {
    options.credentials = 'same-origin'
  }

  if ('body' in options) {
    options.body = JSON.stringify( options.body )
  }

  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'application/json'

  console.log('???', options)
  return fetch(path, options)
    .then(response => response.json())
}
