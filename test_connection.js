const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'new_username',     // ชื่อผู้ใช้ที่คุณสร้างใน MySQL
  password: 'new_password', // รหัสผ่านที่ตั้งให้ผู้ใช้
  database: 'user_db'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});
