import axios from 'axios'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { data } = req.body
    let response
    try {
      response = await axios.post('https://sandbox-api.zoodpay.com/v0/transactions', data, {
        auth: {
          username: 'B!LLZ_W@rk',
          password: 'Q4n3f})pUJ~#.3X{'
        }
      })
    } catch (e) {
      res.end(JSON.stringify({ status: false, message: e.message }))
      return
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: true, data: response.data }))
  } else {
    res.setHeader('Allow', ['POST'])
    res.statusCode = 404
    res.end()
  }
}
