const request = require('request')
const axios = require('axios')


module.exports = {
  call_api: function (url) {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, body) => {
        if (err) {
          reject(err)
        }
        resolve(body)
      })
    })
  },

  post_api: function(url,body) {
    return new Promise((resolve, reject) => {
    axios.post(url, body)
    .then((res) => {
      //console.log(res.data)
      resolve(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
  })

  }
}
