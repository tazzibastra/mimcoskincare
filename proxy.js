import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const CLICKWAY_BASE_URL = 'https://www.clickwaycouriers.co.za/API'

app.post('/api/login', async (req, res) => {
  try {
    const response = await axios.post(`${CLICKWAY_BASE_URL}/Login`, req.body)
    res.json(response.data)
  } catch (error) {
    console.error(error.response?.data || error.message)
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/get-quote', async (req, res) => {
  try {
    const response = await axios.post(`${CLICKWAY_BASE_URL}/GetQuote`, req.body, {
      headers: {
        ApiKey: req.headers.apikey,
      },
    })
    res.json(response.data)
  } catch (error) {
    console.error(error.response?.data || error.message)
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/create-shipment', async (req, res) => {
  try {
    const response = await axios.post(`${CLICKWAY_BASE_URL}/CreateShipment`, req.body, {
      headers: {
        ApiKey: req.headers.apikey,
      },
    })
    res.json(response.data)
  } catch (error) {
    console.error(error.response?.data || error.message)
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`)
})
