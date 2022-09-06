import axios from 'axios'

const useApi = async (method, path, req, header, auth = null) => {
  //import useApi in the component, use inside async function
  //const { data, code } = await useApi('GET/DELETE', '/sample_path/')
  //const { data, code } = await useApi('POST/PUT', '/sample_path/', {request data})

  const base_url = 'https://askitcapstone.live/api/v1'
  const ENDPOINT = `${base_url}${path}`
  const KEY = JSON.parse(localStorage.getItem('user'))?.token ?? null

  console.log("KEY", KEY)

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

  try {
    let response = await axios(config)
    let code = response.status
    let data = response.data

    if (code >= 200 && code < 300) {
      console.log('Success: ' + code, path)
      return { data, code }
    } else {
      console.log('Failed: ' + code, path)
      return { data, code }
    }
    } catch (error) {
    if (error === 'Error: Network Error') {
      alert(error)
    } else {
      console.warn('Error: ' + error)
    }
  }
}

export default useApi