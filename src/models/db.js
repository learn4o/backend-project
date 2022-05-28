'use strict'

var mysql = require('mysql')

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : 'root',
  password        : 'Password@123',
  database        : 'twitter'
})

module.exports = {
    getConnection: function() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err)
                resolve(conn)
            })
        })
    },

    releaseConnection: function(conn) {
        conn.release()
    }
}