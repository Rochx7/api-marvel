import axios from 'axios'

const time = '1623966721'
const pubKey = 'f91e7292febd9cc09579ea5062914309'
const privateKey = '390d2609a31640e748a2a72f3c7f822448472aa0'
const hash = '49c988d750ad9739f26da9d5e3e43e1d'

const api = axios.create({
  baseURL: `https://gateway.marvel.com/v1/public/`,
  params: {
    ts: time,
    apikey: pubKey,
    hash: hash
  }
})

export default api
