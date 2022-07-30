import axios from 'axios'

const useApi = async (method, path, req, header, auth = null) => {
  //import useApi in the component, use inside async function
  //const { data, code } = await useApi('GET/DELETE', '/sample_path/')
  //const { data, code } = await useApi('POST/PUT', '/sample_path/', {request data})

  const base_url = 'https://jsonplaceholder.typicode.com'
  const ENDPOINT = `${base_url}${path}`
  const KEY =  localStorage.getItem('token')

  let config = {
    url: ENDPOINT,
    method: method,
    validateStatus: function (status) {
      return status >= 200 && status < 600
    },
  }

  //Set up Authorization in headers if KEY is present
  if (KEY) {
    config.headers = {
      Authorization: `Token ${KEY}`,
    }
  }

  if (header) {
    config.headers = { ...config.headers, ...header }
  }

  if (auth) {
    config.auth = auth
  }
  //Set up data if third argument (req) is present
  //In instances of POST and PUT requests
  if (req) {
    config.data = req
  }
}

export default useApi