const mysql = require('mysql2')

const config = require('./config')

// 创建连接池
const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if(err) {
      console.log("连接数据库失败~", err);
    } else {
    console.log("连接数据库成功~");
    }
  })
});


module.exports = connections.promise()
