const mysql = require('mysql')
const fs = require('fs')

const writable = fs.createWriteStream('pessoas.csv')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'cadastro'
})

writable.write('id,nome\n', () => {
  connection.connect((err) => {
    const query = connection.query(`select * from pessoas`)
    query.on('result', (row) => {
      connection.pause()
      const data = row.id+','+row.nome+'\n'
      writable.write(data, () => {
        connection.resume()
      })
    })
    query.on('end', () => {
      writable.end()
      connection.end()
    })
  })
})
