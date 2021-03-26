import axios from 'axios'

export default axios.create( {
  baseURL: 'http://smartecg.herokuapp.com'
})