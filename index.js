const express = require('express')
const app = express()
require('dotenv').config()
const { Client } = require('pg')

// app.listen(3000, () => {
//   console.log('Example app listening on port 3000!')
// })

// DB_URLを使用
const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  charset: 'utf-8',
})

// account情報を取得
app.get('/get', async function (req, res) {
  try {
    // 接続
    await client.connect()
    var sql = 'SELECT * FROM d12eht6tqcs93h.Account;'
    client.query(sql, function (err, result) {
      if (err) {
        console.log(err)
        res.status(400)
        res.write(JSON.stringify(err, null, 2))
        res.end()
      } else {
        res.write(JSON.stringify(result.rows, null, 2))
        res.end()
      }
    })
  } catch (e) {
    console.log(e)
    res.status(400)
    res.write(JSON.stringify(e, null, 2))
    res.end()
  }
})

// var port = process.env.PORT || 8080
// app.listen(port)
// console.log('server starting on ' + port + ' ...')
